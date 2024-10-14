
import { Category } from 'src/core/entities';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';

/**
 * Class that represents category service. It contains business logic.
 */
@Injectable()
export class CategoryService {
  private categoryRepository;

  constructor(private dataSource: DataSource) {
    this.categoryRepository = this.dataSource.getRepository(Category);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findOne(id: number): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ id });
  }

  async create(category: CreateCategoryDto): Promise<Category> {
    const newCategory = await this.categoryRepository.create(category);
    return await this.categoryRepository.save(newCategory);
  }

  async update(id: number, category: UpdateCategoryDto): Promise<void> {
    await this.categoryRepository.update(id, category);
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
