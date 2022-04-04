import { DatabaseModule } from './../../database/database.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
// import { SequelizeModule } from '@nestjs/sequelize';
import { usersProviders } from './users.providers';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
