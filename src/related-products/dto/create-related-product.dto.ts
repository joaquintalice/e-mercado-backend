import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateRelatedProductDto {

    @IsNumber()
    @IsNotEmpty()
    prodId: number

    @IsNotEmpty()
    @IsString()
    prodName: string

    @IsNotEmpty()
    @IsString()
    image: string
}
