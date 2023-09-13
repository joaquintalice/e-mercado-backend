import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  soldCount: number;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  image: string[];

  @IsNotEmpty()
  @IsString()
  categoryName: string;
}
