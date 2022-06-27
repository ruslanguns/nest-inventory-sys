import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page? = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(500)
  perPage? = 10;
}
