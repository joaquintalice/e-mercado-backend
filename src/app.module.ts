import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './db/prisma.service';
import { ProductModule } from './product/product.module';
import { RelatedProductsModule } from './related-products/related-products.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [ConfigModule.forRoot(), CategoryModule, ProductModule, RelatedProductsModule, CommentModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
