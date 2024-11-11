import { Injectable } from '@nestjs/common';
import { Company, User } from 'src/core/entities';
import { DataSource } from 'typeorm';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';

@Injectable()
export class CompanyService {
  private companyRepository;
  private userRepository;

  constructor(private dataSource: DataSource) {
    this.companyRepository = this.dataSource.getRepository(Company);
    this.userRepository = this.dataSource.getRepository(User);
  }

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  findOne(id: number): Promise<Company | null> {
    return this.companyRepository.findOneBy({ id });
  }

  async create(company: CreateCompanyDto): Promise<Company> {
    const newCompany = {
      name: company.name,
      description: company.description,
      country_code: company.country_code,
      is_verified: company.is_verified,
      created_at: company.created_at,
      deleted_at: company.deleted_at
    }

    const result = await this.companyRepository.create(company);
    // const owner = await this.userRepository.update({id: company.user_id}, {company_id: result.id});

    return await this.companyRepository.save(result);
  }

  async update(id: number, company: UpdateCompanyDto): Promise<void> {
    await this.companyRepository.update(id, company);
    return this.companyRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }
}
