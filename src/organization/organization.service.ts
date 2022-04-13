import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrganizationDTO } from './dto/organization.dto';
import { Organization } from './interface/organization.interface';

@Injectable()
export class OrganizationService {
    constructor(@InjectModel('Organization') private readonly organizationModel: Model<Organization>) {

    }

    async getOrganizations(skip?: any, limit?: any, filter?: any): Promise<Organization[]> {
        const organizations = await this.organizationModel.find(filter).skip(skip).limit(limit);
        return organizations;
    }

    async getSearchOrganizations(skip?: any, limit?: any, searchString?: any): Promise<Organization[]> {
        const organizations = await this.organizationModel.find({ $text: { $search: searchString } }).skip(skip).limit(limit);
        return organizations;
    }

    async getOrganization(organizationID: string): Promise<Organization> {
        const organization = await this.organizationModel.findById(organizationID);
        return organization;
    }

    async createOrganization(createOrganizationDTO: CreateOrganizationDTO): Promise<Organization> {
        const organization = new this.organizationModel(createOrganizationDTO);
        return await organization.save();
    }

    async deleteOrganization(organizationID: string): Promise<Organization> {
        const deletedOrganization = await this.organizationModel.findByIdAndDelete(organizationID);
        return deletedOrganization;
    }

    async updateOrganization(organizationID: string, createOrganizationDTO: CreateOrganizationDTO): Promise<Organization> {
        const updatedOrganization = await this.organizationModel.findByIdAndUpdate(organizationID, createOrganizationDTO, { new: true });
        return updatedOrganization;
    }
}
