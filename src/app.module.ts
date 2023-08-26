import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './db/prisma.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CategoryModule,
    ProductModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
