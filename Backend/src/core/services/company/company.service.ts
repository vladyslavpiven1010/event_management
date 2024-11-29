import { ForbiddenException, Injectable } from '@nestjs/common';
import { Company, User } from 'src/core/entities';
import { DataSource } from 'typeorm';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { UserService } from '../user/user.service';
import { ERole } from 'src/core/jwt-auth.guard';

@Injectable()
export class CompanyService {
  private companyRepository;
  private userRepository;

  constructor(private dataSource: DataSource, private usersService: UserService) {
    this.companyRepository = this.dataSource.getRepository(Company);
    this.userRepository = this.dataSource.getRepository(User);
  }

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  findOne(id: number): Promise<Company | null> {
    return this.companyRepository.findOneBy({ id });
  }

  async create(userId: number, company: CreateCompanyDto): Promise<Company> {
    const user = await this.usersService.findOneById(company.user_id);
    console.log(user)
    if (user.role_id.name !== ERole.USER) {
      throw new ForbiddenException('Only users with role "user" can create a company');
    }

    const newC = {
      ...company,
      created_at: new Date(),
      deleted_at: null
    }
    
    const newCompany = this.companyRepository.create({ newC });
    await this.usersService.updateRole(userId, ERole.COMPANY_USER);
    await this.companyRepository.save(company);
    
    return newCompany;
  }

  async update(id: number, company: UpdateCompanyDto): Promise<void> {
    await this.companyRepository.update(id, company);
    return this.companyRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }
}
