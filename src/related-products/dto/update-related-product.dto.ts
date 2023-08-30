import { PartialType } from '@nestjs/mapped-types';
import { CreateRelatedProductDto } from './create-related-product.dto';

export class UpdateRelatedProductDto extends PartialType(CreateRelatedProductDto) {}
