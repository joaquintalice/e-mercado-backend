import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class CommentService {

    constructor(private prismaService: PrismaService) { }

    async create() {
        try {
            const comment = await this.prismaService
        } catch (error) {
            console.log(error)
        }
    }

}
