import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/db/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) { }

  private readonly logger = new Logger('je');

  async create(createProductDto: CreateProductDto) {
    try {
      const {
        name,
        cost,
        description,
        currency,
        soldCount,
        image,
        categoryName,
      } = createProductDto;

      const category = await this.prismaService.category.findUnique({
        where: { name: categoryName },
      });

      if (!category)
        throw new BadRequestException(
          `The category with name ${categoryName} was not found`,
        );

      const product = await this.prismaService.product.create({
        data: {
          name,
          description,
          currency,
          cost,
          soldCount,
          categoryName,
          image,
        },
      });

      return product;
    } catch (error) {
      console.log(error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Unique constraint violation');
      }

      throw new Error(`Unknown error`);
    }
  }

  async findAll() {
    const product = await this.prismaService.product.findMany();
    if (!product) throw new NotFoundException(`Product not found`);
    return product;
  }

  async findOne(id: number) {
    // TODO: Hacer la entidad de productos relacionados y comentarios para incluirla acá
    const product = await this.prismaService.product.findUnique({
      where: { id: id },
    });

    if (!product)
      throw new NotFoundException(`Product with name: ${id} not found`);

    return product;
  }

  // TODO: Hacer el endpoint update
  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  // TODO: Hacer el endpoint para borrar productos
  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
