import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Console } from 'console';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/user.dto';
import { User } from './interface/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {

    }

    // for getting all the users
    async getUsers(skip: any, limit: any, filter?: any): Promise<User[]> {
        const users: any = await this.userModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total_users = await this.userModel.countDocuments({});
        users.count = total_users;
        return users;
    }

    // For Searching
    async getSearchUsers(skip: any, limit: any, searchString: any, filter?: any): Promise<User[]> {

        let users: any;

        if (filter) {
            users = await this.userModel.find({ $and: [filter, { $text: { $search: searchString } }] }).skip(skip).limit(limit);

        } else {
            users = await this.userModel.find({ $text: { $search: searchString } }).skip(skip).limit(limit);
        }

        return users;
    }

    async getUser(userID: string): Promise<User> {
        const user = await this.userModel.findById(userID);
        return user;
    }

    async getUserDetail(data: any): Promise<User> {
        const user = await this.userModel.findOne(data);
        return user;
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        const user = new this.userModel(createUserDTO);
        return await user.save();
    }

    async deleteUser(userID: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(userID);
        return deletedUser;
    }

    async updateUser(userID: string, createUserDTO: CreateUserDTO): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(userID, createUserDTO, { new: true });
        return updatedUser;
    }
}
