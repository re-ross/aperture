import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email of user',
    example: 'ryan@test.com',
  })
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'Password for user',
    example: 'password',
  })
  password: string;
}
