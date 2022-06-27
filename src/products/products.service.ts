import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDTO } from 'src/common/dtos';
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
    const client = await this.db.product.findUnique({
      where: {
        id,
      },
    });

    if (!client) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return client;
  }

  async update(id: string, updateSupplierDto: UpdateProductDto) {
    const product = await this.findOne(id);

    return await this.db.product.update({
      data: updateSupplierDto,
      where: {
        id: product.id,
      },
    });
  }

  async remove(id: string) {
    await this.db.product.delete({ where: { id } });
  }
}
