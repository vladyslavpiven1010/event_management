import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/core/services';
import { UpdateUserReqApiDto } from './dto/update-user.dto';
import { JwtAuthGuard, ERole } from 'src/core/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { RequiredRoles } from '../auth/roles.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getUsers(): Promise<any> {
        const user = await this.userService.findAll();
        return user;
    }

    @Get(':id')
    async getUser(@Param() params, @Req() request: any): Promise<any> {
        const user = await this.userService.findOneById(params["id"]);

        if (!user) throw new BadRequestException("user with this credentials does not exist");
        if (user.id !== request.user.sub) throw new ForbiddenException('You do not have permission to get all info about this user');

        return user;
    }

    @Patch(':id')
    async updateUser(@Req() request: any, @Param() params: number, @Body() userDto: UpdateUserReqApiDto): Promise<any> {
        const user = await this.userService.findOneById(params["id"]);
        if (!user) throw new BadRequestException("User with this id does not exist");
        if (request.user.role !== ERole.ADMIN && user.id !== request.user.sub) 
            throw new ForbiddenException('You do not have permission to update this user');

        const updatedUser = await this.userService.update(params["id"], userDto);
        return updatedUser;
    }

    @Delete(':id')
    async deleteUser(@Req() request: any, @Param() params: number): Promise<any> {
        const user = await this.userService.findOneById(params["id"]);
        if (!user) throw new BadRequestException("User with this id does not exist");
        if (request.user.role !== ERole.ADMIN && user.id !== request.user.sub) 
            throw new ForbiddenException('You do not have permission to delete this user');

        const ticket = await this.userService.remove(params["id"]);
        return ticket;
    }
}
