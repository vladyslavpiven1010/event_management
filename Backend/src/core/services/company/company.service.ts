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

  constructor(private dataSource: DataSource, private userService: UserService) {
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
    const newC = {
      ...company,
      created_at: new Date(),
      deleted_at: null
    }
    
    const newCompany: Company = this.companyRepository.create(newC);
    await this.companyRepository.save(newCompany);
    
    return newCompany;
  }

  async update(id: number, company: UpdateCompanyDto): Promise<void> {
    await this.companyRepository.update(id, company);
    return this.companyRepository.findOneBy({ id });
  }

  async kickOutUser(userId: number): Promise<void> {
    await this.userService.updateToUserRole(userId);
  }

  async kickOutAllUsers(company_id: number): Promise<void> {
    const members: User[] = await this.userService.findCompanyMembers(company_id);

    members.map(member => {
      return this.kickOutUser(member.id);
    })
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }
}
