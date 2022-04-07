import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshJWT, AccessJWT } from './strategies';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AccessJWT, RefreshJWT],
})
export class AuthModule {}
