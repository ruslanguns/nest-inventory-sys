import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { DatabaseModule } from './database/database.module';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [DatabaseModule, ClientsModule, SuppliersModule],
})
export class AppModule {}
