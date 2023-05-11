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

    if (createdUser.participants) {
      createdUser.participants = createdUser.participants.map(participant => {

        return {
          canModify: participant.canModify,
          participantId: new Types.ObjectId(participant.participantId)
        }
      })
    }
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

  async addParticipant(eventId: string,userId: string, canModify: boolean = false): Promise<Events> {
    const participant = {
      participantId: new Types.ObjectId(userId),
      canModify
    }
    return await this.eventModel.findByIdAndUpdate({_id: new Types.ObjectId(eventId)}, {$push: {participants: participant}}, {new: true})
  }

  async removeParticipant(eventId: string,userId: string): Promise<Events> {
    const event = await this.eventModel.findById(eventId).lean()
    let participant = event.participants.find(participant => participant.participantId.toString() === userId)
    if (participant) {
      return await this.eventModel.findByIdAndUpdate({_id: new Types.ObjectId(eventId)}, {$pull: {participants: participant}}, {new: true})
    }
    return undefined;
  }

  async deleteOne(id: string): Promise<Events> {
    return await this.eventModel.findByIdAndDelete({
      _id: new Types.ObjectId(id),
    });
  }
}
