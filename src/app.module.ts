import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { DatabaseModule } from './database/database.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ProductsModule } from './products/products.module';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module';
import { SalesOrdersModule } from './sales-orders/sales-orders.module';

@Module({
  imports: [
    DatabaseModule,
    ClientsModule,
    SuppliersModule,
    ProductsModule,
    PurchaseOrdersModule,
    SalesOrdersModule,
  ],
})
export class AppModule {}
