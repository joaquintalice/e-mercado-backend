import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment-product.dto';
import { UpdateCommentDto } from './dto/update-related-product.dto';

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

  @Get('/:id')
  findUnique(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.getUnique(id);
  }

  @Patch('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.delete(id);
  }

}
