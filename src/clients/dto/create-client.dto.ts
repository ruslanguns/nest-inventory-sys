import { IsEAN, IsEnum, IsString, Length } from 'class-validator';

export enum ClientType {
  CIF = 'CIF',
  NIF = 'NIF',
  RUC = 'RUC',
}

export class CreateClientDto {
  @IsString()
  @Length(4, 20)
  idNumber: string;

  @IsEnum(ClientType)
  idType: string;

  @IsString()
  name: string;
}
