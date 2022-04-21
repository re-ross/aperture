import { ApiProperty } from '@nestjs/swagger';
// check class-validator for maximum chars
export class PostDto {
  // @IsNotEmpty()
  @ApiProperty({
    description: 'url for image post',
    example: 'https://picsum.photos/200/300.jpg',
  })
  readonly imgUrl: string;
  @ApiProperty({
    description: 'Caption for the image post',
    example: 'Lorem ipsum etc etc.',
  })
  readonly caption: string;

  // readonly author: string;
}
