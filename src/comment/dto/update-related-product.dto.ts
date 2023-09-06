import { PartialType } from "@nestjs/mapped-types";
import { CreateCommentDto } from "./create-comment-product.dto";

export class UpdateCommentDto extends PartialType(CreateCommentDto) { }