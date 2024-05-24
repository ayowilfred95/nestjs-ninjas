import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePostDto } from './dto/post.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  postHello(@Body() createPost: CreatePostDto) {
    return {
      message: 'Post successfully created',
      data: createPost,
    };
  }
}
