import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDTO } from '../common/dtos';
import { DatabaseService } from '../database/database.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(private readonly db: DatabaseService) {}

  async create(createSupplierDto: CreateSupplierDto) {
    return await this.db.supplier.create({
      data: {
        ...createSupplierDto,
      },
    });
  }

  async findAll(params: PaginationDTO) {
    const { page, perPage: take } = params;

    return await this.db.supplier.findMany({
      skip: (page - 1) * take,
      take,
    });
  }

  async findOne(id: string) {
    const supplier = await this.db.supplier.findUnique({
      where: {
        id,
      },
    });

    if (!supplier) {
      throw new NotFoundException(`Supplier with id ${id} not found`);
    }

    return supplier;
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.findOne(id);

    return await this.db.supplier.update({
      data: updateSupplierDto,
      where: {
        id: supplier.id,
      },
    });
  }

  async remove(id: string) {
    await this.db.supplier.delete({ where: { id } });
  }
}
