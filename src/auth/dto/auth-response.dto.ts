import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsInN1YiI6MiwibmFtZSI6Ikpvw6NvIFBhdWxvIiwiaWF0IjoxNjczOTEwNTc0LCJleHAiOjE2NzM5OTY5NzR9.5ijZFd2wgua54G5zYTAvY-PAwbG39b597Fj40MHzvnA',
  })
  access_token: string;
}
