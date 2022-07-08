import { IsInt, Min, IsString } from 'class-validator';

export class CreateSalesOrderDto {
  @IsInt()
  @Min(1)
  qty: number;

  @IsString()
  clientId: string;

  @IsString()
  productId: string;
}
