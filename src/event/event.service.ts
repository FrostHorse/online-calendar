import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventDocument, Events } from './event.schema';
import { CreateEventDto } from './dtos/create-event.request.dto';
import { UpdateEventDto } from './dtos/update-event-request.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Events.name)
    private eventModel: Model<EventDocument>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Events> {
    const createdUser = new this.eventModel(createEventDto);
    return await createdUser.save();
  }

  async findAll(): Promise<Events[]> {
    return await this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Events> {
    return await this.eventModel
      .findOne({ _id: new Types.ObjectId(id) })
      .lean();
  }
  async updateOne(id: string, updateObj: UpdateEventDto): Promise<Events> {
    return await this.eventModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { $set: updateObj },
      {
        new: true,
      },
    );
  }

  async deleteOne(id: string): Promise<Events> {
    return await this.eventModel.findByIdAndDelete({
      _id: new Types.ObjectId(id),
    });
  }
}
