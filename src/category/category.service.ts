import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger('Category provider');

  constructor(private prismaService: PrismaService) { }

  async getAll() {
    const category = await this.prismaService.category.findMany({ include: { Product: true } });

    const catWithProductCount = category.map(category => {
      return {
        ...category,
        productCount: category.Product.length
      }
    })

    return catWithProductCount
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, description, imgSrc } = createCategoryDto;

    const newCategory = await this.prismaService.category.create({
      data: {
        name,
        description,
        imgSrc,
      },
    });

    return newCategory;
  }

  async findOne(id: number) {
    const category = await this.prismaService.category.findUnique({ where: { id: id } })
    if (!category) throw new NotFoundException(`Category with id: ${id} not found`);
    return category;
  }

}
