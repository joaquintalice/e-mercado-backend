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
import { Prisma, PrismaClient } from '@prisma/client';

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

  async findAll() {
    try {
      const products = await this.prismaService.product.findMany({
        include: {
          relatedProducts: true,
        },
      });

      if (!products || products.length === 0) {
        throw new NotFoundException(`No products found`);
      }

      const productsWithRelatedProducts = await Promise.all(products.map(async product => {
        const relatedProducts = await Promise.all(product.relatedProducts.map(async (relProd) => {
          const relatedProduct = await this.prismaService.product.findUnique({ where: { id: relProd.prodId } });

          if (relatedProduct) {
            const { id, name, image } = relatedProduct;
            return {
              id,
              name,
              image: image[0],
            };
          }

          return null;
        }));

        const validRelatedProducts = relatedProducts.filter(relProd => relProd !== null).slice(0, 2);

        return {
          ...product,
          relatedProducts: validRelatedProducts,
        };
      }));

      return productsWithRelatedProducts;
    } catch (error) {
      console.error("Error in findAll:", error);
      throw error;
    }
  }





  async findOne(id: number) {
    try {
      // Fetch the main product with relatedProducts
      const product = await this.prismaService.product.findUnique({
        where: { id: id },
        include: { relatedProducts: true, commentId: true },
      });

      if (!product) {
        throw new NotFoundException(`Product with id: ${id} not found`);
      }

      // Extract relevant details from relatedProducts
      const relatedProducts = await Promise.all(product.relatedProducts.map(async (relProd) => {
        const relatedProduct = await this.prismaService.product.findUnique({
          where: { id: relProd.prodId },
        });

        if (relatedProduct) {
          return {
            id: relatedProduct.id,
            name: relatedProduct.name,
            image: relatedProduct.image[0],
          };
        }

        return null;
      }));

      // Filter out null entries and limit relatedProducts to 2
      const validRelatedProducts = relatedProducts.filter(relProd => relProd !== null).slice(0, 2);

      // Return the main product with relevant relatedProducts
      return {
        ...product,
        relatedProducts: validRelatedProducts,
      };
    } catch (error) {
      console.error("Error in findOne:", error);
      throw error;
    }
  }


  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const { name, description, currency, cost, soldCount, image } = updateProductDto;
      const product = await this.prismaService.product.update({
        where: { id: id },
        data: {
          name,
          description,
          currency,
          cost,
          soldCount,
          image
        }
      })

      return product;
    } catch (error) {
      console.log(error)

      switch (error instanceof Prisma.PrismaClientKnownRequestError) {

        case error.code === 'P2025': {
          console.log(error.message)
          throw new NotFoundException(`Product to update with id: ${id} not found`);
        }
        default: {
          error.message
        }
      }

      throw new Error(`Unknown error`);
    }
  }

  async remove(id: number) {

    try {
      const product = await this.prismaService.product.delete({ where: { id: id } });
      return product;
    } catch (error) {
      console.log(error);

      switch (error instanceof Prisma.PrismaClientKnownRequestError) {
        case error.code === 'P2025': {
          throw new NotFoundException(`Category to delete does not exist.`);
        }
      }

      throw new Error(`Unknown error`);
    }

  }
}
