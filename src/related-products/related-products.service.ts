import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRelatedProductDto } from './dto/create-related-product.dto';
import { UpdateRelatedProductDto } from './dto/update-related-product.dto';
import { PrismaService } from 'src/db/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RelatedProductsService {

  constructor(private prismaService: PrismaService) { }

  async create(createRelatedProductDto: CreateRelatedProductDto) {
    try {
      const { prodId, prodName, image } = createRelatedProductDto

      const relatedProd = await this.prismaService.relatedProducts.create({
        data: {
          prodId,
          prodName,
          image
        }

      })

      return relatedProd;
    } catch (error) {
      console.log(error);

      switch (error instanceof Prisma.PrismaClientKnownRequestError) {
        case error.code === 'P2002': {
          throw new ConflictException('Unique constraint violation');
        }
        case error.code === 'P2003': {
          throw new ConflictException('Must create product first');
        }
      }

      throw new Error(`Unknown error`);
    }
  }

  async findAll() {
    const relProd = await this.prismaService.relatedProducts.findMany();
    return relProd;
  }

  async findOne(id: number) {
    const relProd = await this.prismaService.relatedProducts.findUnique({ where: { id: id }, include: { Product: true } });
    return relProd;
  }

  async update(id: number, updateRelatedProductDto: UpdateRelatedProductDto) {
    return `This action updates a #${id} relatedProduct`;
  }

  async remove(id: number) {
    return this.prismaService.relatedProducts.delete({ where: { id: id } });
  }
}
