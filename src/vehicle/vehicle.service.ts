
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVehicleDTO } from './dto/vehicle.dto';
import { Vehicle } from './interface/vehicle.interface';

@Injectable()
export class VehicleService {
    constructor(@InjectModel('Vehicle') private readonly vehicleModel: Model<Vehicle>) {

    }

    async getVehicles(skip: any, limit: any, filter?: any): Promise<Vehicle[]> {
        const vehicles: any = await this.vehicleModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total_vehicles = await this.vehicleModel.countDocuments({});
        vehicles.count = total_vehicles;
        return vehicles;
    }

    async getVehicle(vehicleID: string): Promise<Vehicle> {
        const vehicle = await this.vehicleModel.findById(vehicleID);
        return vehicle;
    }

    async createVehicle(createVehicleDTO: CreateVehicleDTO): Promise<Vehicle> {
        const vehicle = new this.vehicleModel(createVehicleDTO);
        return await vehicle.save();
    }

    async deleteVehicle(vehicleID: string): Promise<Vehicle> {
        const deletedVehicle = await this.vehicleModel.findByIdAndDelete(vehicleID);
        return deletedVehicle;
    }

    async updateVehicle(vehicleID: string, createVehicleDTO: CreateVehicleDTO): Promise<Vehicle> {
        const updatedVehicle = await this.vehicleModel.findByIdAndUpdate(vehicleID, createVehicleDTO, { new: true });
        return updatedVehicle;
    }
}
