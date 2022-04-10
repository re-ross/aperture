import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        handle: dto.handle,
        email: dto.email,
        hash,
      },
    });

    const tokens = await this.generateTokens(
      newUser.handle,
      newUser.id,
      newUser.email,
    );
    await this.updateRefreshHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('No user found');

    const passwordMatches = await bcrypt.compare(dto.password, user.hash);

    if (!passwordMatches) throw new ForbiddenException('Password');

    const tokens = await this.generateTokens(user.handle, user.id, user.email);
    await this.updateRefreshHash(user.id, tokens.refresh_token);
    return tokens;
  }
  async logout(userId: string) {
    // Logger.log(userId);
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }
  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashedRt) throw new ForbiddenException('Access denied');

    const refreshMatches = await bcrypt.compare(rt, user.hashedRt);

    if (!refreshMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.generateTokens(user.id, user.handle, user.email);
    await this.updateRefreshHash(user.id, tokens.refresh_token);
    return tokens;
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async generateTokens(
    handle: string,
    userId: string,
    email: string,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      handle: handle,
      sub: userId,
      email: email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWTKEY,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWTKEY_REFRESH,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  async updateRefreshHash(userId: string, refresh_token: string) {
    const hash = await this.hashData(refresh_token);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }
}
