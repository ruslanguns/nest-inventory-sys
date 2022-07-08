import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDTO } from 'src/common/dtos';
import { DatabaseService } from 'src/database/database.service';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { UpdateSalesOrderDto } from './dto/update-sales-order.dto';

@Injectable()
export class SalesOrdersService {
  constructor(private readonly db: DatabaseService) {}
  async create(createSalesOrderDto: CreateSalesOrderDto) {
    return await this.db.salesOrder.create({
      data: {
        ...createSalesOrderDto,
      },
    });
  }

  async findAll(params: PaginationDTO) {
    const { page, perPage: take } = params;

    return await this.db.salesOrder.findMany({
      skip: (page - 1) * take,
      take,
    });
  }

  async findOne(id: string) {
    const so = await this.db.salesOrder.findUnique({
      where: {
        id,
      },
    });

    if (!so) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    return so;
  }

  async update(id: string, updateSODto: UpdateSalesOrderDto) {
    const so = await this.findOne(id);

    return await this.db.salesOrder.update({
      data: updateSODto,
      where: {
        id: so.id,
      },
    });
  }

  async remove(id: string) {
    await this.db.salesOrder.delete({ where: { id } });
  }
}
