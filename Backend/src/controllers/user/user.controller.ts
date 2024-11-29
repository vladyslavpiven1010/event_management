import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/core/services';
import { CreateUserReqApiDto } from './dto/create-user.dto';
import { UpdateUserReqApiDto } from './dto/update-user.dto';
import { JwtAuthGuard, ERole } from 'src/core/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { RequiredRoles } from '../auth/roles.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getUsers(): Promise<any> {
        const user = await this.userService.findAll();
        return user;
    }

    @Get(':id')
    async getUser(@Param() params, @Req() req: Request): Promise<any> {
        const user = await this.userService.findOneById(params.id);
        return user;
    }

    @Post()
    async createUser(@Body() userDto: CreateUserReqApiDto): Promise<any> {
        const user = await this.userService.create(userDto);
        return user;
    }

    @Patch(':id')
    async updateUser(@Param() params: number, @Body() userDto: UpdateUserReqApiDto): Promise<any> {
        const user = await this.userService.update(params["id"], userDto);
        return user;
    }

    @Delete(':id')
    async ownAccount(@Param() params: number): Promise<any> {
        const ticket = await this.userService.remove(params["id"]);
        return ticket;
    }

    @UseGuards(RolesGuard)
    @RequiredRoles(ERole.ADMIN)
    @Delete('any/:id')
    async deleteUser(@Param() params: number): Promise<any> {
        const ticket = await this.userService.remove(params["id"]);
        return ticket;
    }
}
