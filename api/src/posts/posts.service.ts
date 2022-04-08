import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { PostDto } from './dto/post.dto';
import { post } from 'src/auth/types';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(data: PostDto, req): Promise<post> {
    console.log(req.user.email);
    const newPost = await this.prisma.post.create({
      data: {
        imgUrl: data.imgUrl,
        caption: data.caption,
        user: {
          connect: { id: req.user.sub },
        },
      },
    });
    return newPost;
  }

  // getAllPosts

  // getPost(':id')

  // updatePost('id')

  //deletePost('id)
}
