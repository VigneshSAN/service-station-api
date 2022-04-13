import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CustomerService } from 'src/customer/customer.service';
import { CreateServiceDTO } from './dto/service.dto';
import { NotificationService } from './notification.service';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
    constructor(private serviceService: ServiceService,
        public customerService: CustomerService,
        public notificationService: NotificationService) {

    }

    @Get('/')
    async getServices(@Res() res, @Query('skip', ParseIntPipe) skip, @Query('limit', ParseIntPipe) limit, @Query('filter') filter?: any) {
        let services;

        if (filter) {
            services = await this.serviceService.getServices(skip, limit, JSON.parse(filter));
        } else {
            services = await this.serviceService.getServices(skip, limit);
        }

        return res.status(HttpStatus.OK).json({ services: services, total: services.count });
    }

    @Get('/:serviceID')
    async getService(@Res() res, @Param('serviceID') serviceID) {
        const service = await this.serviceService.getService(serviceID);
        if (!service) throw new NotFoundException('Service Does not Exists!');
        return res.status(HttpStatus.OK).json(service);
    }

    @Post('/create')
    async createPost(@Res() res, @Body() createServiceDTO: CreateServiceDTO) {
        const service = await this.serviceService.createService(createServiceDTO);

        let customer_object: any = createServiceDTO.customer;

        const customer = await this.customerService.getCustomer(customer_object._id);

        // this.notificationService.sendSMS(customer.mobile, 'Dear Mr/Mrs' + customer.name + 'The Vehicle Service Done from Sree Kumaran Service Center and your service Bill Amount Rs.' + createServiceDTO.bill_amount + 'is Successfully paid.');

        return res.status(HttpStatus.OK).json({
            message: 'Service Successfuly Added!',
            service: service
        })
    }

    @Delete('/delete/:serviceID')
    async deleteService(@Res() res, @Param('serviceID') serviceID) {
        const deletedService = await this.serviceService.deleteService(serviceID);

        if (!deletedService) throw new NotFoundException('Service Does not Exists!');

        return res.status(HttpStatus.OK).json({
            message: 'Service Successfuly Deleted!',
        })
    }

    @Put('/update')
    async updateService(@Res() res, @Body() createServiceDTO: CreateServiceDTO, @Query('serviceID') serviceID) {

        const updatedService = await this.serviceService.updateService(serviceID, createServiceDTO);

        if (!updatedService) throw new NotFoundException('Service Does not Exists!');

        return res.status(HttpStatus.OK).json({
            message: 'Service Successfuly Updated!',
            service: updatedService
        })
    }
}
