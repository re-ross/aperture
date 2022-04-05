import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UsersService,
    private JwtService: JwtService,
  ) {}

  async validateUser(email: string, pw: string) {
    const user = await this.UserService.findOneByEmail(email);

    if (!user) return null;

    return user;

    const match = this.ValidatePassword(pw, user.password);

    if (!match) return null;

    const { password, ...result } = user['dataValues'];
    return result;
  }

  private async ValidatePassword(epw, dbpw) {
    return await bcrypt.compare(epw, dbpw);
  }

  async login(user) {
    const User = this.UserService.findOneByEmail(user.email);

    if (!User) throw new UnauthorizedException('invalid Credentials');

    const token = this.JwtService.signAsync(user);
    return {
      User,
      token,
    };
  }

  async create(user: UserDto) {
    const pw = await bcrypt.hash(user.password, 10);
    const newUser = await this.UserService.create(user);
    const { password, ...res } = newUser['dataValues'];

    const token = this.JwtService.signAsync(res);

    return {
      newUser,
      token,
    };
  }
}
