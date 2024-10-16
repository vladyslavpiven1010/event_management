import { Injectable } from '@nestjs/common';
import { User } from 'src/core/entities';
import { DataSource } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  private userRepository;

  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  findAll(): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect("user.company_id", "company")
      .innerJoinAndSelect("user.role_id", "role")
      .getMany();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect("user.company_id", "company")
      .innerJoinAndSelect("user.role_id", "role")
      .getOne({ id });
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = {
      ...user,
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
}
