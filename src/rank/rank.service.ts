import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rank, RankDocument } from './rank.schema';
import { CreateRankDto } from './dtos/create-rank-request.dto';
import { UpdateRankDto } from './dtos/update-rank-request.dto';

@Injectable()
export class RankService {
  constructor(@InjectModel(Rank.name) private rankModel: Model<RankDocument>) {}

  async create(createUserDto: CreateRankDto): Promise<Rank> {
    const createdUser = new this.rankModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<Rank[]> {
    return await this.rankModel.find().exec();
  }

  async findOne(id: string): Promise<Rank> {
    return await this.rankModel.findOne({ _id: new Types.ObjectId(id) }).lean();
  }

  async updateOne(id: string, updateObj: UpdateRankDto): Promise<Rank> {
    return await this.rankModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { $set: updateObj },
      {
        new: true,
      },
    );
  }

  async deleteOne(id: string): Promise<Rank> {
    return await this.rankModel.findByIdAndDelete({
      _id: new Types.ObjectId(id),
    });
  }
}
