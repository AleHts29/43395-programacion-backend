import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schema/user.shcema';


@Injectable()
export class UserService {

  // Manejamos algo memoria
  // users: Array<User>


  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    // this.users = [];
  }


  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findAll() {
    const data = await this.userModel.find({});
    // console.log(data);
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
