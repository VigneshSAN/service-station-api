import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServiceListDTO } from './dto/service-list.dto';
import { ServiceList } from './interface/service-list.interface';

@Injectable()
export class ServiceListService {
    constructor(@InjectModel('ServiceList') private readonly serviceListModel: Model<ServiceList>) {

    }

    async getServiceLists(skip: any, limit: any, filter?: any): Promise<ServiceList[]> {
        const serviceLists: any = await this.serviceListModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total_serviceLists = await this.serviceListModel.countDocuments({});
        serviceLists.count = total_serviceLists;
        return serviceLists;
    }

    async getServiceList(serviceListID: string): Promise<ServiceList> {
        const serviceList = await this.serviceListModel.findById(serviceListID);
        return serviceList;
    }

    async createServiceList(createServiceListDTO: CreateServiceListDTO): Promise<ServiceList> {
        const serviceList = new this.serviceListModel(createServiceListDTO);
        return await serviceList.save();
    }

    async deleteServiceList(serviceListID: string): Promise<ServiceList> {
        const deletedServiceList = await this.serviceListModel.findByIdAndDelete(serviceListID);
        return deletedServiceList;
    }

    async updateServiceList(serviceListID: string, createServiceListDTO: CreateServiceListDTO): Promise<ServiceList> {
        const updatedServiceList = await this.serviceListModel.findByIdAndUpdate(serviceListID, createServiceListDTO, { new: true });
        return updatedServiceList;
    }
}
