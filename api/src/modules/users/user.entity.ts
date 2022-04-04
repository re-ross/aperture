import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    description: 'Name of user.',
    example: 'Ryan Ross',
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  @ApiProperty({
    description: 'Email of user',
    example: 'ryan@test.com',
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    description: 'Password for user',
    example: '******',
  })
  password: string;
}
