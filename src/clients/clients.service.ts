import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginationDTO } from '../common/dtos';

@Injectable()
export class ClientsService {
  constructor(private readonly db: DatabaseService) {}

  async create(createClientDto: CreateClientDto) {
    return await this.db.client.create({
      data: {
        ...createClientDto,
      },
    });
  }

  async findAll(params: PaginationDTO) {
    const { page, perPage: take } = params;

    return await this.db.client.findMany({
      skip: (page - 1) * take,
      take,
    });
  }

  async findOne(id: string) {
    const client = await this.db.client.findUnique({
      where: {
        id,
      },
    });

    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.findOne(id);

    return await this.db.client.update({
      data: updateClientDto,
      where: {
        id: client.id,
      },
    });
  }

  async remove(id: string) {
    await this.db.client.delete({ where: { id } });
  }
}
