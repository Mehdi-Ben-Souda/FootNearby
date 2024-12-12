import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {EntityManager, Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserService {

  constructor(
      @InjectRepository(User)
      private readonly userRepository:Repository<User>,
      private readonly entityManager:EntityManager) {
  }
  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto)
    return await this.entityManager.save(user)
  }

  async findAll() {
    return this.userRepository.find()
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({id})
  }
  async findByEmail(email: string) {
    return this.userRepository.findOneBy({email})
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user=await this.userRepository.findOneBy({id})
    Object.assign(user,updateUserDto)
    await this.userRepository.save(user)
  }


  async remove(id: number) {
    return await this.userRepository.delete(id)
  }
}
