import { Injectable } from '@nestjs/common';
import { Company } from 'src/core/entities';
import { DataSource } from 'typeorm';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';

@Injectable()
export class CompanyService {
  private companyRepository;

  constructor(private dataSource: DataSource) {
    this.companyRepository = this.dataSource.getRepository(Company);
  }

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  findOne(id: number): Promise<Company | null> {
    return this.companyRepository.findOneBy({ id });
  }

  async create(company: CreateCompanyDto): Promise<Company> {
    const newCompany = await this.companyRepository.create(company);
    return await this.companyRepository.save(newCompany);
  }

  async update(id: number, company: UpdateCompanyDto): Promise<void> {
    await this.companyRepository.update(id, company);
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }
}
