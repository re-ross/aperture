import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of user.',
    example: 'Ryan Ross',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email of user',
    example: 'ryan@test.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'Password for user',
    example: 'password',
  })
  readonly password: string;
}
