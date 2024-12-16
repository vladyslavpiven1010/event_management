import { Injectable } from '@nestjs/common';
import { User, Role, Company } from 'src/core/entities';
import { DataSource } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ERole } from 'src/core/jwt-auth.guard';

@Injectable()
export class UserService {
  private userRepository;
  private roleRepository;
  private companyRepository;

  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
    this.roleRepository = this.dataSource.getRepository(Role);
    this.companyRepository = this.dataSource.getRepository(Company);
  }

  findAll(): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect("user.company_id", "company")
      .innerJoinAndSelect("user.role_id", "role")
      .getMany();
  }

  findCompanyMembers(company_id: number): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect("user.company_id", "company")
      .innerJoinAndSelect("user.role_id", "role")
      .where("user.company_id = :company_id", { company_id: company_id })
      .getMany();
  }

  findOneById(id: number): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect("user.company_id", "company")
      .innerJoinAndSelect("user.role_id", "role")
      .where("user.id = :id", { id: id })
      .getOne();
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect("user.company_id", "company")
      .innerJoinAndSelect("user.role_id", "role")
      .where("user.email = :email", { email: email })
      .getOne();
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = {
      ...user,
      role_id: 1,
      created_at: new Date(),
      deleted_at: null
    }

    const result = await this.userRepository.create(newUser);
    return await this.userRepository.save(result);
  }

  async update(id: number, user: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const user = await this.userRepository.findOneBy({ id } );
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);
  }

  async updateToUserRole(id: number) {
    const user: User = await this.userRepository.findOneBy({ id });
    if (user) {
      user.role_id = await this.roleRepository.findOneBy({name: ERole.USER});
      user.company_id = null;
      await this.userRepository.update(user.id, user);
      await this.userRepository.save(user);
    }
  }

  async updateToMember(id: number, company_id: number) {
    console.log("User ID", id)
    const user: User = await this.findOneById(id);
    console.log("User Entity", user)
    user.role_id = await this.roleRepository.findOneBy({name: ERole.COMPANY_USER});
    console.log(user.role_id)
    user.company_id = await this.companyRepository.findOneBy({id: company_id});

    await this.userRepository.update(user.id, user);
    await this.userRepository.save(user);
  }
}
