import { Module } from '@nestjs/common';
import { RelatedProductsService } from './related-products.service';
import { RelatedProductsController } from './related-products.controller';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  controllers: [RelatedProductsController],
  providers: [RelatedProductsService, PrismaService],
})
export class RelatedProductsModule { }
