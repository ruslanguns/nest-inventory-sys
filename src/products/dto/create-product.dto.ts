import { IsInt, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  sku: string;

  @IsString()
  sn: string;

  @IsInt()
  @Min(0)
  stock: number;
}
