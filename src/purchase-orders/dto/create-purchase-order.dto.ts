import { IsInt, IsString, Min } from 'class-validator';

export class CreatePurchaseOrderDto {
  @IsInt()
  @Min(1)
  qty: number;

  @IsString()
  supplierId: string;

  @IsString()
  productId: string;
}
