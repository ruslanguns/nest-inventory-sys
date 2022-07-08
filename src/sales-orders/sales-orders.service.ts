import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PaginationDTO } from '../common/dtos';
import { DatabaseService } from '../database/database.service';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { UpdateSalesOrderDto } from './dto/update-sales-order.dto';

@Injectable()
export class SalesOrdersService {
  constructor(private readonly db: DatabaseService) {}

  async create(createSalesOrderDto: CreateSalesOrderDto) {
    try {
      const { clientId, productId, qty } = createSalesOrderDto;

      // 1. Validate if client exists
      await this.db.client.findUniqueOrThrow({
        where: { id: clientId },
      });

      // 2. Validate if product exists
      const product = await this.db.product.findUniqueOrThrow({
        where: { id: productId },
      });
      // 3. Validate if product has enough stock
      if (product.stock < qty) {
        throw new NotAcceptableException(`Product has not enough stock`);
      }

      // 4. Update product stock
      await this.db.product.update({
        where: { id: productId },
        data: { stock: product.stock - qty },
      });

      // 5. Create sales order
      return await this.db.salesOrder.create({
        data: {
          ...createSalesOrderDto,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error:
            error.message || 'An error occurred while creating sales order',
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
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
      throw new NotFoundException(`Salaes order with id ${id} not found`);
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
