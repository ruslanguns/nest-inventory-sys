import { IsEnum, IsString, Length } from 'class-validator';

export enum SupplierType {
  CIF = 'CIF',
  NIF = 'NIF',
  RUC = 'RUC',
}

export class CreateSupplierDto {
  @IsString()
  @Length(4, 20)
  idNumber: string;

  @IsEnum(SupplierType)
  idType: string;

  @IsString()
  name: string;
}
