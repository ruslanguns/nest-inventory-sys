import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDTO } from '../common/dtos';
import { DatabaseService } from '../database/database.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';

@Injectable()
export class PurchaseOrdersService {
  constructor(private readonly db: DatabaseService) {}
  async create(createPODto: CreatePurchaseOrderDto) {
    return await this.db.purchaseOrder.create({
      data: {
        ...createPODto,
      },
    });
  }

  async findAll(params: PaginationDTO) {
    const { page, perPage: take } = params;

    return await this.db.purchaseOrder.findMany({
      skip: (page - 1) * take,
      take,
    });
  }

  async findOne(id: string) {
    const po = await this.db.purchaseOrder.findUnique({
      where: {
        id,
      },
    });

    if (!po) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    return po;
  }

  async update(id: string, updatePODto: UpdatePurchaseOrderDto) {
    const po = await this.findOne(id);

    return await this.db.purchaseOrder.update({
      data: updatePODto,
      where: {
        id: po.id,
      },
    });
  }

  async remove(id: string) {
    await this.db.purchaseOrder.delete({ where: { id } });
  }
}
