import { Body, Controller, Post, Get, Patch, Param, Delete, UseGuards, BadGatewayException, BadRequestException } from '@nestjs/common';
import { CategoryService } from 'src/core/services';
import { CreateCategoryReqApiDto } from './dto/create-category.dto';
import { UpdateCategoryReqApiDto } from './dto/update-category.dto';
import { ERole, JwtAuthGuard } from 'src/core/jwt-auth.guard';
import { RequiredRoles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('category')
@UseGuards(RolesGuard)
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    async getCategories(): Promise<any> {
        const category = await this.categoryService.findAll();
        return category;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getCategory(@Param() params): Promise<any> {
        const category = await this.categoryService.findOne(params.id);
        if (!category) throw new BadRequestException("Category with this credentials does not exist");

        return category;
    }

    @UseGuards(JwtAuthGuard)
    @RequiredRoles(ERole.ADMIN)
    @Post()
    async createCategory(@Body() categoryDto: CreateCategoryReqApiDto): Promise<any> {
        const category = await this.categoryService.create(categoryDto);
        return category;
    }

    @UseGuards(JwtAuthGuard)
    @RequiredRoles(ERole.ADMIN)
    @Patch(':id')
    async updateCategory(@Param() params, @Body() categoryDto: UpdateCategoryReqApiDto): Promise<any> {
        const category = await this.categoryService.findOne(params.id);
        if (!category) throw new BadRequestException("Category with this credentials does not exist");

        const deletedCategory = await this.categoryService.update(params["id"], categoryDto);
        return deletedCategory;
    }

    @UseGuards(JwtAuthGuard)
    @RequiredRoles(ERole.ADMIN)
    @Delete(':id')
    async deleteCategory(@Param() params): Promise<any> {
        const category = await this.categoryService.findOne(params.id);
        if (!category) throw new BadRequestException("Category with this credentials does not exist");

        const deletedCategory = await this.categoryService.remove(params["id"]);
        return deletedCategory;
    }
}
