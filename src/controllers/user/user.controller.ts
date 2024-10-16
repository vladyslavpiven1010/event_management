import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from 'src/core/services';
import { CreateUserReqApiDto } from './dto/create-user.dto';
import { UpdateUserReqApiDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    //@CheckAuth()
    async getUsers(): Promise<any> {
        const user = await this.userService.findAll();
        return user;
    }

    @Get(':id')
    //@CheckAuth()
    async getUser(@Param() params): Promise<any> {
        const user = await this.userService.findOne(params.id);
        return user;
    }

    @Post()
    //@CheckAuth()
    async createUser(@Body() userDto: CreateUserReqApiDto): Promise<any> {
        const user = await this.userService.create(userDto);
        return user;
    }

    @Patch(':id')
    //@CheckAuth()
    async updateUser(@Param() params: number, @Body() userDto: UpdateUserReqApiDto): Promise<any> {
        const user = await this.userService.update(params["id"], userDto);
        return user;
    }

    @Delete(':id')
    //@CheckAuth()
    async deleteTicket(@Param() params: number): Promise<any> {
        const ticket = await this.userService.remove(params["id"]);
        return ticket;
    }
}
