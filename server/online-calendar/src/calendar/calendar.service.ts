import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Calendar, CalendarDocument } from './calendar.schema';
import { CreateCalendarDto } from './dtos/create-calendar-request.dto';
import { UpdateCalendarDto } from './dtos/update-calendar-request.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Calendar.name)
    private calendarModel: Model<CalendarDocument>,
  ) {}

  async create(createCalendarDto: CreateCalendarDto): Promise<Calendar> {
    const createdUser = new this.calendarModel(createCalendarDto);
    return await createdUser.save();
  }

  async findAll(): Promise<Calendar[]> {
    return await this.calendarModel.find().exec();
  }

  async findOne(id: string): Promise<Calendar> {
    return await this.calendarModel
      .findOne({ _id: new Types.ObjectId(id) })
      .lean();
  }

  async updateOne(id: string, updateObj: UpdateCalendarDto): Promise<Calendar> {
    return await this.calendarModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { $set: updateObj },
      {
        new: true,
      },
    );
  }

  async deleteOne(id: string): Promise<Calendar> {
    return await this.calendarModel.findByIdAndDelete({
      _id: new Types.ObjectId(id),
    });
  }

  async getCalendarsForUser(userId: string): Promise<Calendar[]> {
    return this.calendarModel.find({ownerId: new Types.ObjectId(userId)});
  }

  async addEvent(calendarId: string,eventId: string): Promise<Calendar> {
    return await this.calendarModel.findByIdAndUpdate({_id: new Types.ObjectId(calendarId)}, {$push: {eventIds: new Types.ObjectId(eventId)}}, {new: true})
  }

  async removeEvent(calendarId: string,eventId: string): Promise<Calendar> {
    return await this.calendarModel.findByIdAndUpdate({_id: new Types.ObjectId(calendarId)}, {$pull: {eventIds: new Types.ObjectId(eventId)}}, {new: true})
  }
}
