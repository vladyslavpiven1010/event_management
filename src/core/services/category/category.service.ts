
import { Category } from 'src/core/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';

/**
 * Class that represents category service. It contains business logic.
 */
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findOne(id: number): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ id });
  }

  async create(category: Category): Promise<Category> {
    return await this.categoryRepository.create(category);
  }

  async update(id: number, category: Category): Promise<void> {
    await this.categoryRepository.update(id, category);
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  /**
   * Create category.
   * @param name
   * @returns
   */
  public async createCategory(categoryCreate: CreateCategoryDto): Promise<Category> {
    const categoryDraft: Category = {
      name: categoryCreate.name
    };
    //console.log(categoryDraft)
    const category = await dataClient.category.create(categoryDraft);
    return category;
  }

  public async getCategory(categoryId: number, @DataClient() dataClient?: IDataClient): Promise<Category> {
    const category = await dataClient.category.findById(categoryId);
    if (!category) throw new NotFoundException('There is no such category with this ID');
    return category;
  }

  public async getAllCategories(@DataClient() dataClient?: IDataClient): Promise<Category[]> {
    const category = await dataClient.category.findAll({});
    return category;
  }

  public async updateCategory(categoryId: number, categoryUpdate: UpdateCategoryDto, @DataClient() dataClient?: IDataClient): Promise<Category> {
    const category = await dataClient.category.updateById(categoryId, categoryUpdate);
    return category;
  }
}
