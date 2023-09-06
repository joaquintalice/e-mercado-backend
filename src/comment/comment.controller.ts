import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment-product.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post('')
  insert(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.insert(createCommentDto);
  }

  @Get()
  getAll() {
    return this.commentService.getAll();
  }

  @Get(':id')
  findUnique(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.getUnique(id);
  }

}
