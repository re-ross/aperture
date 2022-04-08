import { RefreshGuard } from './../common/guards/refresh.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PostsService } from '../posts/posts.service';
import { AuthDto } from './dto';
import { PostDto } from 'src/posts/dto/post.dto';
import { Tokens } from './types';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { GetCurrentUser } from 'src/common/decorators';
import { post } from 'src/auth/types';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private postsService: PostsService,
  ) {}

  @Public()
  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }
  @Public()
  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Post('/create')
  async createPost(@Body() postDto: PostDto, @Request() req): Promise<post> {
    return this.postsService.createPost(postDto, req);
  }
}
