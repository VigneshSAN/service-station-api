
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServiceDTO } from './dto/service.dto';
import { Service } from './interface/service.interface';
import { NotificationService } from './notification.service';

@Injectable()
export class ServiceService {
    constructor(@InjectModel('Service') private readonly serviceModel: Model<Service>, public notificationService: NotificationService) {

    }

    async getServices(skip: any, limit: any, filter?: any): Promise<Service[]> {
        const services: any = await this.serviceModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total_services = await this.serviceModel.countDocuments({});
        services.count = total_services;
        return services;
    }
                
    async getService(serviceID: string): Promise<Service> {
        const service = await this.serviceModel.findById(serviceID);
        return service;
    }

    async createService(createServiceDTO: CreateServiceDTO): Promise<Service> {
        const service = new this.serviceModel(createServiceDTO);
        return await service.save();
    }

    async deleteService(serviceID: string): Promise<Service> {
        const deletedService = await this.serviceModel.findByIdAndDelete(serviceID);
        return deletedService;
    }

    async updateService(serviceID: string, createServiceDTO: CreateServiceDTO): Promise<Service> {
        const updatedService = await this.serviceModel.findByIdAndUpdate(serviceID, createServiceDTO, { new: true });
        return updatedService;
    }
}
