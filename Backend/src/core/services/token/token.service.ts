import { Injectable } from '@nestjs/common';
import { Token, User } from 'src/core/entities';
import { DataSource } from 'typeorm';

@Injectable()
export class TokenService  {
  private tokenRepository;

  constructor(private dataSource: DataSource) {
    this.tokenRepository = this.dataSource.getRepository(Token);
  }

  async saveToken(accessToken: string, refreshToken: string, user: User): Promise<Token> {
    const token = {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: user
    };
    const tokenEntity = this.tokenRepository.create(token);
    return this.tokenRepository.save(tokenEntity);
  }

  async invalidateToken(token: string): Promise<void> {
    await this.tokenRepository.update({ refresh_token: token }, { is_valid: false });
  }

  async findByRefreshToken(refresh_token: string): Promise<Token | undefined> {
    return this.tokenRepository.findOne({ where: { refresh_token }, relations: ['user'] });
  }

  async findByAccessToken(access_token: string): Promise<Token> {
    return this.tokenRepository.findOne({ where: { access_token }, relations: ['user'] });
  }
}
