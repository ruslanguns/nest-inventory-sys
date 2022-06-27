import { IsString, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsString()
  sku: string;

  @IsString()
  sn: string;

  @IsString()
  name: string;

  @IsInt()
  stock: string;
}
