import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerService } from 'src/customer/customer.service';
import { CustomerSchema } from 'src/customer/schemas/customer.schema';
import { VehicleSchema } from './schemas/vehicle.schemas';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }]),
  ],
  controllers: [VehicleController],
  providers: [VehicleService]
})
export class VehicleModule {}
