// import { PostsService } from './posts.service';
import { Controller } from '@nestjs/common';
// import { PostDto } from './dto/post.dto';
// import { post } from 'src/auth/types';

@Controller('posts')
export class PostsController {}
//   constructor(private postsService: PostsService) {}

//   // Get()
//   // async findAll() {
//   //     return await this.postsService.findAll();
//   // }

//   //     Get(':id')
//   //     async findOne(@Param('id') id: string): Promise<PostDto> {
//   //         return await this.postsService.findOne(id);
//   //     }

//   @Post('/create')
//   async createPost(@Body() postDto: PostDto, @Request() req): Promise<post> {
//     return this.postsService.createPost(postDto, req.user.id);
//   }
// }

// //     @Put(':id')
// //     async await this.postsService.updatePost(id) { }

// // @Delete(':id')
// //     return this.postsService.delete(id) {}
