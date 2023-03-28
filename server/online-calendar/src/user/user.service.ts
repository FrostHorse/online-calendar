import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dtos/create-user-request.dto';
import { hashPassword, validatePassword } from 'src/util.functions';
import { UpdateUserDto } from './dtos/update-user-request.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      ...createUserDto,
      password: await hashPassword(createUserDto.password),
    });
    return await createdUser.save();
  }

  async loginUser(email: string, password): Promise<User> {
    const user = await this.findOne(email);
    if (user.password && (await validatePassword(user.password, password))) {
      return user;
    }
    return undefined;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).lean();
  }

  async updateOne(id: string, updateObj: UpdateUserDto): Promise<User> {
    if (updateObj.password) {
      updateObj.password = await hashPassword(updateObj.password);
    }
    return await this.userModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { $set: updateObj },
      {
        new: true,
      },
    );
  }

  async deleteOne(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete({
      _id: new Types.ObjectId(id),
    });
  }
}
