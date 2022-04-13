import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceListSchema } from './schemas/service-list.schema';
import { ServiceListController } from './service-list.controller';
import { ServiceListService } from './service-list.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ServiceList', schema: ServiceListSchema }]),
  ],
  controllers: [ServiceListController],
  providers: [ServiceListService]
})
export class ServiceListModule {}
