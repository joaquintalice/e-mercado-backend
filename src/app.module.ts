import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './db/prisma.service';
import { ProductModule } from './product/product.module';
import { RelatedProductsModule } from './related-products/related-products.module';

@Module({
  imports: [ConfigModule.forRoot(), CategoryModule, ProductModule, RelatedProductsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
