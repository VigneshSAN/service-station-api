import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { CreateVehicleDTO } from './dto/vehicle.dto';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
    constructor(private vehicleService: VehicleService) {

    }

    @Get('/')
    async getVehicles(@Res() res, @Query('skip', ParseIntPipe) skip, @Query('limit', ParseIntPipe) limit, @Query('filter') filter?: any) {

        let vehicles;

        if (filter) {
            vehicles = await this.vehicleService.getVehicles(skip, limit, JSON.parse(filter));
        } else {
            vehicles = await this.vehicleService.getVehicles(skip, limit);
        }

        return res.status(HttpStatus.OK).json({ vehicles: vehicles, total: vehicles.count });
    }

    @Get('/:vehicleID')
    async getVehicle(@Res() res, @Param('vehicleID') vehicleID) {
        const vehicle = await this.vehicleService.getVehicle(vehicleID);
        if (!vehicle) throw new NotFoundException('Vehicle Does not Exists!');
        return res.status(HttpStatus.OK).json(vehicle);
    }

    @Post('/create')
    async createPost(@Res() res, @Body() createVehicleDTO: CreateVehicleDTO) {
        const vehicle = await this.vehicleService.createVehicle(createVehicleDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Vehicle Successfuly Added!',
            vehicle: vehicle
        })
    }

    @Delete('/delete/:vehicleID')
    async deleteVehicle(@Res() res, @Param('vehicleID') vehicleID) {
        const deletedVehicle = await this.vehicleService.deleteVehicle(vehicleID);

        if (!deletedVehicle) throw new NotFoundException('Vehicle Does not Exists!');
        
        return res.status(HttpStatus.OK).json({
            message: 'Vehicle Successfuly Deleted!',
        })
    }

    @Put('/update')
    async updateVehicle(@Res() res, @Body() createVehicleDTO: CreateVehicleDTO, @Query('vehicleID') vehicleID) {

        const updatedVehicle = await this.vehicleService.updateVehicle(vehicleID, createVehicleDTO);

        if (!updatedVehicle) throw new NotFoundException('Vehicle Does not Exists!');

        return res.status(HttpStatus.OK).json({
            message: 'Vehicle Successfuly Updated!',
            vehicle: updatedVehicle
        })
    }
}
