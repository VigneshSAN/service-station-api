import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { CreateOrganizationDTO } from './dto/organization.dto';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
    constructor(private organizationService: OrganizationService) {

    }

    @Get('/')
    async getOrganizations(@Res() res, @Query('skip', ParseIntPipe) skip, @Query('limit', ParseIntPipe) limit, @Body() filter: any) {
        const organizations = await this.organizationService.getOrganizations(skip, limit, filter);
        return res.status(HttpStatus.OK).json({ organizations });
    }

    @Get('/search')
    async getSearchUsers(@Res() res, @Query('skip', ParseIntPipe) skip, @Query('limit', ParseIntPipe) limit, @Query('searchString') searchString: any) {
        let users;

        if (searchString == "") {
            users = await this.organizationService.getOrganizations(skip, limit)
        } else {
            users = await this.organizationService.getSearchOrganizations(skip, limit, searchString);
        }

        return res.status(HttpStatus.OK).json({ users });
    }

    @Get('/:organizationID')
    async getOrganization(@Res() res, @Param('organizationID') organizationID) {
        const organization = await this.organizationService.getOrganization(organizationID);
        if (!organization) throw new NotFoundException('Organization Does not Exists!');
        return res.status(HttpStatus.OK).json(organization);
    }

    @Post('/create')
    async createPost(@Res() res, @Body() createOrganizationDTO: CreateOrganizationDTO) {
        const organization = await this.organizationService.createOrganization(createOrganizationDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Organization Successfuly Added!',
            organization: organization
        })
    }

    @Delete('/delete/:organizationID')
    async deleteOrganization(@Res() res, @Param('organizationID') organizationID) {
        const deletedOrganization = await this.organizationService.deleteOrganization(organizationID);

        if (!deletedOrganization) throw new NotFoundException('Organization Does not Exists!');

        return res.status(HttpStatus.OK).json({
            message: 'Organization Successfuly Deleted!',
        })
    }

    @Put('/update')
    async updateOrganization(@Res() res, @Body() createOrganizationDTO: CreateOrganizationDTO, @Query('organizationID') organizationID) {

        const updatedOrganization = await this.organizationService.updateOrganization(organizationID, createOrganizationDTO);

        if (!updatedOrganization) throw new NotFoundException('Organization Does not Exists!');

        return res.status(HttpStatus.OK).json({
            message: 'Organization Successfuly Updated!',
            organization: updatedOrganization
        })
    }
}
