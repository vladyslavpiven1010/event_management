import { Body, Controller, Post, Get, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from 'src/core/services';
import { CreateCategoryReqApiDto } from './dto/create-category.dto';
import { UpdateCategoryReqApiDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/core/jwt-auth.guard';

@Controller('category')
@UseGuards(JwtAuthGuard)
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    async getCategories(): Promise<any> {
        const category = await this.categoryService.findAll();
        return category;
    }

    @Get(':id')
    async getCategory(@Param() params): Promise<any> {
        const category = await this.categoryService.findOne(params.id);
        return category;
    }

    @Post()
    async createCategory(@Body() categoryDto: CreateCategoryReqApiDto): Promise<any> {
        console.log(categoryDto)
        const category = await this.categoryService.create(categoryDto);
        return category;
    }

    @Patch(':id')
    async updateCategory(@Param() params: number, @Body() categoryDto: UpdateCategoryReqApiDto): Promise<any> {
        const category = await this.categoryService.update(params["id"], categoryDto);
        return category;
    }

    @Delete(':id')
    async deleteCategory(@Param() params: number): Promise<any> {
        const category = await this.categoryService.remove(params["id"]);
        return category;
    }
}
