import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ServiceModule } from './service/service.module';
import { AuthModule } from './auth/auth.module';
import { ServiceListModule } from './service-list/service-list.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Xreon:NPBG0LLsyESt3PxC@cluster0-pvow6.gcp.mongodb.net/xreon-service-center-db?retryWrites=true&w=majority', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }),
    OrganizationModule,
    UserModule,
    CustomerModule,
    VehicleModule,
    ServiceModule,
    AuthModule,
    ServiceListModule,
    DashboardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
