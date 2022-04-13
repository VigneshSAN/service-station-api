import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService, public authService: AuthService) {

    }

    @Get('/')
    @UseGuards(AuthGuard())
    async getUsers(@Res() res, @Query('skip', ParseIntPipe) skip, @Query('limit', ParseIntPipe) limit, @Query('filter') filter?: any) {

        let users;

        if (filter) {
            users = await this.userService.getUsers(skip, limit, JSON.parse(filter));
        } else {
            users = await this.userService.getUsers(skip, limit);
        }

        return res.status(HttpStatus.OK).json({ users: users, total: users.count });
    }

    @Get('/search')
    @UseGuards(AuthGuard())
    async getSearchUsers(@Res() res, @Query('skip', ParseIntPipe) skip, @Query('limit', ParseIntPipe) limit, @Query('searchString') searchString: any, @Query('filter') filter?: any) {
        let users;

        if (searchString == "" && !filter) {
            users = await this.userService.getUsers(skip, limit);
        } else if (searchString == "" && filter) {
            users = await this.userService.getUsers(skip, limit, JSON.parse(filter));
        } else if (searchString != "" && !filter) {
            users = await this.userService.getSearchUsers(skip, limit, searchString);
        } else {
            users = await this.userService.getSearchUsers(skip, limit, searchString, JSON.parse(filter));
        }

        return res.status(HttpStatus.OK).json({ users });
    }

    @Get('/:userID')
    @UseGuards(AuthGuard())
    async getUser(@Res() res, @Param('userID') userID) {
        const user = await this.userService.getUser(userID);
        if (!user) throw new NotFoundException('User Does not Exists!');
        return res.status(HttpStatus.OK).json(user);
    }

    @Post('/create')
    @UseGuards(AuthGuard())
    async createPost(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.createUser(createUserDTO);

        let user_auth = {
            username: createUserDTO.email,
            password: 'admin@123'
        }

        this.authService.signUp(user_auth);
        
        return res.status(HttpStatus.OK).json({
            message: 'User Successfuly Added!',
            user: user
        })
    }

    @Delete('/delete/:userID')
    @UseGuards(AuthGuard())
    async deleteUser(@Res() res, @Param('userID') userID) {
        const deletedUser = await this.userService.deleteUser(userID);
        if (!deletedUser) throw new NotFoundException('User Does not Exists!');
        return res.status(HttpStatus.OK).json({
            message: 'User Successfuly Deleted!',
        })
    }

    @Put('/update')
    @UseGuards(AuthGuard())
    async updateUser(@Res() res, @Body() createUserDTO: CreateUserDTO, @Query('userID') userID) {
        const updatedUser = await this.userService.updateUser(userID, createUserDTO);
        if (!updatedUser) throw new NotFoundException('User Does not Exists!');
        return res.status(HttpStatus.OK).json({
            message: 'User Successfuly Updated!',
            user: updatedUser
        })
    }
}
