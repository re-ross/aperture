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
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() post: PostDto, @Request() req): Promise<post> {
    return this.postsService.createPost(post, req);
  }
  @Public()
  @Get('/feed')
  @HttpCode(HttpStatus.OK)
  async getFeed() {
    return await this.postsService.getFeed();
  }
  @Public()
  @Get('/posts/:handle')
  @HttpCode(HttpStatus.OK)
  async getUsersPosts(@Param('handle') handle: string) {
    return await this.postsService.getUsersPosts(handle);
  }

  @Public()
  @Get('/posts/post/:id')
  @HttpCode(HttpStatus.OK)
  async getPost(@Param('id') id: string) {
    return await this.postsService.getPost(id);
  }

  @Public()
  @Patch('/posts/post/:id')
  @HttpCode(HttpStatus.OK)
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return await this.postsService.updatePost(id, updatePostDto);
  }

  @Public()
  @Delete('/posts/post/:id')
  @HttpCode(HttpStatus.OK)
  async deletePost(@Param('id') id: string) {
    return await this.postsService.deletePost(id);
  }
}
