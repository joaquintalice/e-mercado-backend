import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {

    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @IsNumber()
    @IsNotEmpty()
    score: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    user: string;



}