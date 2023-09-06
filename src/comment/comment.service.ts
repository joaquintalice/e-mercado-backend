import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateCommentDto } from './dto/create-comment-product.dto';

@Injectable()
export class CommentService {

    constructor(private prismaService: PrismaService) { }

    async insert(createCommentDto: CreateCommentDto) {
        try {
            const { description, productId, score, user } = createCommentDto
            const comment = await this.prismaService.productCommets.create({
                data: {
                    productId,
                    user,
                    score,
                    description
                }
            });
            return comment
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const comment = await this.prismaService.productCommets.findMany();
            return comment
        } catch (error) {
            console.log(error);
        }
    }

    async getUnique(id: number) {
        try {
            const comment = await this.prismaService.productCommets.findUnique({ where: { id: id } });
            if (!comment) throw new NotFoundException(`Comment with id: ${id} not found`);
            return comment
        } catch (error) {
            console.log(error);
        }
    }



}
