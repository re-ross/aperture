import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthService } from 'src/auth/auth.service';
import { AccessJWT } from '../auth/strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [PostsService, AuthService, AccessJWT],
  controllers: [PostsController],
})
export class PostsModule {}
