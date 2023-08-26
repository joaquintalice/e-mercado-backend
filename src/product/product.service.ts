import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/db/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) { }

  async create(createProductDto: CreateProductDto) {

    try {
      const { name, cost, description, currency, soldCount, image, categoryName } = createProductDto;

      const category = await this.prismaService.category.findUnique({ where: { name: categoryName } });

      if (!category) throw new BadRequestException(`The category with name ${categoryName} was not found`);

      const product = await this.prismaService.product.create({
        data: {
          name,
          description,
          currency,
          cost,
          soldCount,
          categoryName,
          image
        }
      })

      return product;

    } catch (error) {
      console.log(error)
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Unique constraint violation');
      }

      throw new Error(`Unknown error`);
    }

  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
