import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection, DataSource, EntityManager, QueryRunner, Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    // private readonly connection: Connection,
    private readonly dataSource: DataSource,
  ) {}

  async create(email: string, password: string) {
    // const user = this.repo.create({ email, password });
    // return this.repo.save(user);
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const user = this.repo.create({ email, password });
      const createdUser = await queryRunner.manager.save(User, user);
      await queryRunner.commitTransaction();
      return createdUser;
    } catch(error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(id: number): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if(!user) {
      throw new NotFoundException('user is not found');
    }
    return user;
  }

  async find(email: string) {
    if(!email) {
      return await this.repo.find();
    }
    return await this.repo.find({ where: { email } });
  }

  // Partial means all attributes of `User` are optional, does not allow foreign attributes
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    // override `user` in place
    Object.assign(user, attrs);
    return await this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.repo.remove(user);
  }
}


// const usersService = new UsersService({} as any);
// usersService.update(1, { email: 'user@user.com' });
// usersService.update(1, { address: '...' }); // error
