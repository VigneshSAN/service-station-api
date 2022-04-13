import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { CreateCustomerDTO } from './dto/customer.dto';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {

    }

    @Get('/')
    async getCustomers(@Res() res, @Query('skip', ParseIntPipe) skip, @Query('limit', ParseIntPipe) limit, @Query('filter') filter?: any) {

        let customers;

        if (filter) {
            customers = await this.customerService.getCustomers(skip, limit, JSON.parse(filter));
        } else {
            customers = await this.customerService.getCustomers(skip, limit);
        }

        return res.status(HttpStatus.OK).json({ customers: customers, total: customers.count });
    }

    @Get('/:customerID')
    async getCustomer(@Res() res, @Param('customerID') customerID) {
        const customer = await this.customerService.getCustomer(customerID);
        if (!customer) throw new NotFoundException('Customer Does not Exists!');
        return res.status(HttpStatus.OK).json(customer);
    }

    @Post('/create')
    async createPost(@Res() res, @Body() createCustomerDTO: CreateCustomerDTO) {
        const customer = await this.customerService.createCustomer(createCustomerDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Customer Successfuly Added!',
            customer: customer
        })
    }

    @Delete('/delete/:customerID')
    async deleteCustomer(@Res() res, @Param('customerID') customerID) {
        const deletedCustomer = await this.customerService.deleteCustomer(customerID);

        if (!deletedCustomer) throw new NotFoundException('Customer Does not Exists!');
        
        return res.status(HttpStatus.OK).json({
            message: 'Customer Successfuly Deleted!',
        })
    }

    @Put('/update')
    async updateCustomer(@Res() res, @Body() createCustomerDTO: CreateCustomerDTO, @Query('customerID') customerID) {

        const updatedCustomer = await this.customerService.updateCustomer(customerID, createCustomerDTO);

        if (!updatedCustomer) throw new NotFoundException('Customer Does not Exists!');

        return res.status(HttpStatus.OK).json({
            message: 'Customer Successfuly Updated!',
            customer: updatedCustomer
        })
    }
}
