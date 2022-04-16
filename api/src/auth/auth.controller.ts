import { RefreshGuard } from './../common/guards/refresh.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Req,
  Res,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PostsService } from '../posts/posts.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { GetCurrentUser } from 'src/common/decorators';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private prisma: PrismaService,
  ) {}

  @Public()
  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }
  @Public()
  @Post('/local/signin')
  async signinLocal(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    const token = await this.authService.generateTokens(
      user.handle,
      user.id,
      user.email,
    );
    const { access_token, refresh_token } = token;

    res.cookie('access_token', access_token, { httpOnly: false });
    return token;
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
    Logger.warn(userId);
    return this.authService.logout(userId);
  }

  @UseGuards(RefreshGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
