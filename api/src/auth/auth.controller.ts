import { RefreshGuard } from './../common/guards/refresh.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Patch,
  Delete,
  Req,
  Res,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PostsService } from '../posts/posts.service';
import { AuthDto } from './dto';
import { PostDto } from 'src/posts/dto/post.dto';
import { Tokens } from './types';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { GetCurrentUser } from 'src/common/decorators';
import { post } from 'src/auth/types';
import { UpdatePostDto } from 'src/posts/dto/updatepost.dto';
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
  // @Public()
  // @Post('/local/signin')
  // signinLocal(@Body() dto: AuthDto, response: Response): Promise<Tokens> {
  //   return this.authService.signinLocal(dto, response);
  // }
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

    Logger.warn(token);
    res.cookie('access_token', access_token, { httpOnly: false });
    return token;
  }
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
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

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() post: PostDto, @Request() req): Promise<post> {
    return this.postsService.createPost(post, req);
  }

  @Get('/feed')
  @HttpCode(HttpStatus.OK)
  async getFeed() {
    return await this.postsService.getFeed();
  }

  @Get('/posts/:handle')
  @HttpCode(HttpStatus.OK)
  async getUsersPosts(@Param('handle') handle: string) {
    return await this.postsService.getUsersPosts(handle);
  }

  @Get('/posts/post/:id')
  @HttpCode(HttpStatus.OK)
  async getPost(@Param('id') id: string) {
    return await this.postsService.getPost(id);
  }

  @Patch('/posts/post/:id')
  @HttpCode(HttpStatus.OK)
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return await this.postsService.updatePost(id, updatePostDto);
  }

  @Delete('/posts/post/:id')
  @HttpCode(HttpStatus.OK)
  async deletePost(@Param('id') id: string) {
    return await this.postsService.deletePost(id);
  }
}
