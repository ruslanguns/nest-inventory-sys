import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDTO } from '../common/dtos';
import { DatabaseService } from '../database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly db: DatabaseService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.db.product.create({
      data: {
        ...createProductDto,
      },
    });
  }

  async findAll(params: PaginationDTO) {
    const { page, perPage: take } = params;

    return await this.db.product.findMany({
      skip: (page - 1) * take,
      take,
    });
  }

  async findOne(id: string) {
    const product = await this.db.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateClientDto: UpdateProductDto) {
    const product = await this.findOne(id);

    return await this.db.product.update({
      data: updateClientDto,
      where: {
        id: product.id,
      },
    });
  }

  async remove(id: string) {
    await this.db.product.delete({ where: { id } });
  }
}
