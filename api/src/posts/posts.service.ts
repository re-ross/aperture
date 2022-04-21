import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/updatepost.dto';
import { post } from 'src/auth/types';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(data: PostDto, { user }, file): Promise<post> {
    const newPost = await this.prisma.post.create({
      data: {
        imgUrl: file.originalname,
        bytes: file.buffer,
        caption: data.caption,
        author: user.handle,
        user: {
          connect: { id: user.sub },
        },
      },
    });
    return newPost;
  }

  async getFeed() {
    return await this.prisma.post.findMany({});
    // make public feed vs private
    // eventually switch to auth route for personalized feed
  }

  async getCurrentUsersPosts(id: string): Promise<post[]> {
    return await this.prisma.post.findMany({
      where: { userId: id },
    });
  }
  async getUsersPosts(id: string): Promise<post[]> {
    return await this.prisma.post.findMany({
      where: { userId: id },
    });
  }
  async getPost(id: string) {
    return await this.prisma.post.findUnique({
      where: { id: id },
    });
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: {
        id: id,
      },
      data: updatePostDto,
    });
  }

  async deletePost(id: string) {
    return await this.prisma.post.delete({ where: { id: id } });
  }
}
