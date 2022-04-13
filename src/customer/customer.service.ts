import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDTO } from './dto/customer.dto';
import { Customer } from './interface/customer.interface';

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) {

    }

    async getCustomers(skip: any, limit: any, filter?: any): Promise<Customer[]> {
        const customers: any = await this.customerModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total_customers = await this.customerModel.countDocuments({});
        customers.count = total_customers;
        return customers;
    }

    async getCustomer(customerID: string): Promise<Customer> {
        const customer = await this.customerModel.findById(customerID);
        return customer;
    }

    async createCustomer(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
        const customer = new this.customerModel(createCustomerDTO);
        return await customer.save();
    }

    async deleteCustomer(customerID: string): Promise<Customer> {
        const deletedCustomer = await this.customerModel.findByIdAndDelete(customerID);
        return deletedCustomer;
    }

    async updateCustomer(customerID: string, createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
        const updatedCustomer = await this.customerModel.findByIdAndUpdate(customerID, createCustomerDTO, { new: true });
        return updatedCustomer;
    }
}
