import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Prisma } from '@prisma/client';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger('Category provider');

  constructor(private prismaService: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto) {

    try {
      const { name, description, imgSrc } = createCategoryDto;

      const newCategory = await this.prismaService.category.create({
        data: {
          name,
          description,
          imgSrc,
        },
      });

      return newCategory;
    } catch (error) {
      console.log(error);

      switch (error instanceof Prisma.PrismaClientKnownRequestError) {
        case error.code === 'P2002': {
          throw new ConflictException('Unique constraint violation');
        }
        case error.code === 'P2003': {
          throw new ConflictException('Must create category first');
        }
      }

      throw new Error(`Unknown error`);
    }
  }

  async getAll() {
    const category = await this.prismaService.category.findMany({
      include: { Product: true },
    });

    if (!category || category.length === 0) throw new NotFoundException(`No products found`);

    const catWithProductCount = category.map((category) => {
      const { Product, ...rest } = category;
      return {
        ...rest,
        productCount: category.Product.length,
      };
    });

    return catWithProductCount;
  }



  async findOne(catId: string) {
    const category = await this.prismaService.category.findUnique({
      where: { name: catId },
      include: { Product: true },
    });
    if (!category)
      throw new NotFoundException(`Category with id: ${catId} not found`);
    const { description, imgSrc, ...rest } = category;
    return rest;
  }

  async delete(catId: string) {
    try {
      const category = await this.prismaService.category.delete({
        where: { name: catId },
      });
      if (!category) throw new BadRequestException(`je`);
      return category;
    } catch (error) {
      console.log(error);

      switch (error instanceof Prisma.PrismaClientKnownRequestError) {
        case error.code === 'P2003': {
          throw new ConflictException(
            `Can't delete category associated with products`,
          );
        }
        case error.code === 'P2025': {
          throw new NotFoundException(`Category to delete does not exist.`);
        }
      }

      throw new Error(`Unknown error`);
    }
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateCategoryDto> {
    const existingCategory = await this.prismaService.category.findUnique({
      where: { name: id },
    });
    if (!existingCategory)
      throw new NotFoundException(`Category with id: ${id} not found`);

    const { name, description, imgSrc } = updateCategoryDto;

    const updatedCategory = await this.prismaService.category.update({
      where: { name: existingCategory.name },
      data: {
        name: name ?? existingCategory.name,
        description: description ?? existingCategory.description,
        imgSrc: imgSrc ?? existingCategory.imgSrc,
      },
    });

    return updatedCategory;
  }
}
