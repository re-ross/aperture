import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsNotEmpty()
  @MaxLength(12)
  @ApiProperty({
    description: 'Display name for user',
    example: '@reross',
  })
  handle: string;
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
