import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { DatabaseModule } from './database/database.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [DatabaseModule, ClientsModule, SuppliersModule, ProductsModule],
})
export class AppModule {}
