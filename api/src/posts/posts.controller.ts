import { PostsService } from './posts.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from 'src/posts/dto/updatepost.dto';
import { post } from 'src/auth/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { GetCurrentUserId } from 'src/common/decorators';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}
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

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  async getUsersPosts(@GetCurrentUserId() userId: string) {
    return await this.postsService.getUsersPosts(userId);
  }

  @Get('/post/:id')
  @HttpCode(HttpStatus.OK)
  async getPost(@Param('id') id: string) {
    return await this.postsService.getPost(id);
  }

  @Patch('/post/:id')
  @HttpCode(HttpStatus.OK)
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return await this.postsService.updatePost(id, updatePostDto);
  }

  @Delete('/post/:id')
  @HttpCode(HttpStatus.OK)
  async deletePost(@Param('id') id: string) {
    return await this.postsService.deletePost(id);
  }
}
