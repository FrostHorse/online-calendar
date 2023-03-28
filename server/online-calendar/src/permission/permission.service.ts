import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './permission.schema';
import { CreatePermissionDto } from './dtos/create-permission-request.dto';
import { UpdatePermissionDto } from './dtos/update-permissions-request.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
  ) {}

  async create(createUserDto: CreatePermissionDto): Promise<Permission> {
    const createdUser = new this.permissionModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<Permission[]> {
    return await this.permissionModel.find().exec();
  }

  async findOne(id: string): Promise<Permission> {
    return await this.permissionModel
      .findOne({ _id: new Types.ObjectId(id) })
      .lean();
  }
  async updateOne(
    id: string,
    updateObj: UpdatePermissionDto,
  ): Promise<Permission> {
    return await this.permissionModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { $set: updateObj },
      {
        new: true,
      },
    );
  }

  async deleteOne(id: string): Promise<Permission> {
    return await this.permissionModel.findByIdAndDelete({
      _id: new Types.ObjectId(id),
    });
  }
}
