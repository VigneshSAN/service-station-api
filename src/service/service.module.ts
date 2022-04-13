import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerService } from 'src/customer/customer.service';
import { CustomerSchema } from 'src/customer/schemas/customer.schema';
import { NotificationService } from './notification.service';
import { ServiceSchema } from './schemas/service.schemas';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Service', schema: ServiceSchema }, { name: 'Customer', schema: CustomerSchema }]),
  ],
  controllers: [ServiceController],
  providers: [ServiceService, NotificationService, CustomerService]
})
export class ServiceModule { }
