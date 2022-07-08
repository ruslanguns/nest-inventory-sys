import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDTO } from '../common/dtos';
import { DatabaseService } from 'src/database/database.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';

@Injectable()
export class PurchaseOrdersService {
  constructor(private readonly db: DatabaseService) {}

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    // FIXME: transactions not working: getting 'not longr valid, las state 'expired'
    // return await this.db.$transaction(async (prisma) => {});

    const { supplierId, productId, qty } = createPurchaseOrderDto;

    // 1. Verify if supplier exists
    const supplier = await this.db.supplier.findUnique({
      where: { id: supplierId },
    });

    if (!supplier) {
      throw new NotFoundException(`supplier with id ${supplierId} not found`);
    }

    // 2. Verify if product exists and get current stock
    const product = await this.db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`supplier with id ${supplierId} not found`);
    }

    // 3. Update product stock
    await this.db.product.update({
      where: { id: productId },
      data: { stock: product.stock + qty },
    });

    // 4. Create purchase
    return await this.db.purchaseOrder.create({
      data: {
        ...createPurchaseOrderDto,
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
    const purchaseOrder = await this.db.purchaseOrder.findUnique({
      where: {
        id,
      },
    });

    if (!purchaseOrder) {
      throw new NotFoundException(`purchaseOrder with id ${id} not found`);
    }

    return purchaseOrder;
  }

  async update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    const product = await this.findOne(id);

    return await this.db.purchaseOrder.update({
      data: updatePurchaseOrderDto,
      where: {
        id: product.id,
      },
    });
  }

  async remove(id: string) {
    await this.db.purchaseOrder.delete({ where: { id } });
  }
}
