import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateCommentDto } from './dto/create-comment-product.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';
import { UpdateCommentDto } from './dto/update-related-product.dto';

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
            switch (error instanceof Prisma.PrismaClientKnownRequestError) {
                case error.code === 'P2003': {
                    throw new ConflictException(`Must create product first`);
                }
            }
            console.log(error)
        }
    }

    async getAll() {
        try {
            const comment = await this.prismaService.productCommets.findMany();
            if (!comment || comment.length === 0) throw new NotFoundException(`Comments not found`)
            return comment
        } catch (error) {
            console.log(error);
            throw new NotFoundException(error.message)
        }
    }

    async getUnique(id: number) {
        try {
            const comment = await this.prismaService.productCommets.findUnique({ where: { id: id } });
            if (!comment) throw new NotFoundException(`Comment with id: ${id} not found`);
            return comment
        } catch (error) {
            console.log(error);
            throw new NotFoundException(error.message)
        }
    }


    async update(id: number, updateCommentDto: UpdateCommentDto) {

        try {
            const { user, productId, description, score } = updateCommentDto

            const updatedComment = await this.prismaService.productCommets.update({
                where: { id: id },
                data: {
                    user,
                    productId,
                    description,
                    score
                }
            })

            return updatedComment
        } catch (error) {
            switch (error instanceof Prisma.PrismaClientKnownRequestError) {
                case error.code === 'P2003': {
                    throw new ConflictException(`Must create product first`);
                }
            }
            console.log(error)
        }
    }

    async delete(id: number) {

        try {
            const comment = await this.getUnique(id);

            return await this.prismaService.productCommets.delete({ where: { id: comment.id } })
        } catch (error) {
            console.log(error)
            throw new NotFoundException(error.message)
        }

    }


}
