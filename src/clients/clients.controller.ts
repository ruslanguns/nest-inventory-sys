import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginationDTO } from '../common/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientsService.create(createClientDto);
  }

  // GET http:localhost:3000/clients?page=1&perPage=10
  @Get()
  async findAll(@Query() queryParams: PaginationDTO) {
    return await this.clientsService.findAll(queryParams);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.clientsService.update(id, updateClientDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.clientsService.remove(id);
  }
}
