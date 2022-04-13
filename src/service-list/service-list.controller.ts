import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { CreateServiceListDTO } from './dto/service-list.dto';
import { ServiceListService } from './service-list.service';

@Controller('service-list')
export class ServiceListController {
    constructor(private serviceListService: ServiceListService) {

    }

    @Get('/')
    async getServiceLists(@Res() res, @Query('skip', ParseIntPipe) skip, @Query('limit', ParseIntPipe) limit, @Query('filter') filter?: any) {

        let serviceLists;

        if (filter) {
            serviceLists = await this.serviceListService.getServiceLists(skip, limit, JSON.parse(filter));
        } else {
            serviceLists = await this.serviceListService.getServiceLists(skip, limit);
        }

        return res.status(HttpStatus.OK).json({ serviceLists: serviceLists, total: serviceLists.count });
    }

    @Get('/:serviceListID')
    async getServiceList(@Res() res, @Param('serviceListID') serviceListID) {
        const serviceList = await this.serviceListService.getServiceList(serviceListID);
        if (!serviceList) throw new NotFoundException('ServiceList Does not Exists!');
        return res.status(HttpStatus.OK).json(serviceList);
    }

    @Post('/create')
    async createPost(@Res() res, @Body() createServiceListDTO: CreateServiceListDTO) {
        const serviceList = await this.serviceListService.createServiceList(createServiceListDTO);
        return res.status(HttpStatus.OK).json({
            message: 'ServiceList Successfuly Added!',
            serviceList: serviceList
        })
    }

    @Delete('/delete/:serviceListID')
    async deleteServiceList(@Res() res, @Param('serviceListID') serviceListID) {
        const deletedServiceList = await this.serviceListService.deleteServiceList(serviceListID);

        if (!deletedServiceList) throw new NotFoundException('ServiceList Does not Exists!');
        
        return res.status(HttpStatus.OK).json({
            message: 'ServiceList Successfuly Deleted!',
        })
    }

    @Put('/update')
    async updateServiceList(@Res() res, @Body() createServiceListDTO: CreateServiceListDTO, @Query('serviceListID') serviceListID) {

        const updatedServiceList = await this.serviceListService.updateServiceList(serviceListID, createServiceListDTO);

        if (!updatedServiceList) throw new NotFoundException('ServiceList Does not Exists!');

        return res.status(HttpStatus.OK).json({
            message: 'ServiceList Successfuly Updated!',
            serviceList: updatedServiceList
        })
    }
}
