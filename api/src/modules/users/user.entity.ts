import { Table, Column, Model } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class User extends Model<User> {
  @Column({
    allowNull: false,
  })
  @ApiProperty({
    description: 'Name of user.',
    example: 'Ryan Ross',
  })
  name: string;

  @Column({
    unique: true,
    allowNull: false,
  })
  @ApiProperty({
    description: 'Email of user',
    example: 'ryan@test.com',
  })
  email: string;

  @Column({
    allowNull: false,
  })
  @ApiProperty({
    description: 'Password for user',
    example: 'password123',
  })
  password: string;
}
