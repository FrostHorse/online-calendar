import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dtos/create-user-request.dto';
import { hashPassword, validatePassword } from 'src/util.functions';
import { UpdateUserDto } from './dtos/update-user-request.dto';
import { Calendar } from 'src/calendar/calendar.schema';

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
    console.log(email)
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

  async addCalendar(userId: string, calendarId: string,canModify: boolean = false): Promise<User> {
    const calendar = {
      calendarId: new Types.ObjectId(calendarId),
      canModify
    }
    return await this.userModel.findByIdAndUpdate({_id: new Types.ObjectId(userId)}, {$push: {visibleCalendars: calendar}}, {new: true})
  }

  async removeCalendar(userId: string, calendarId: string,): Promise<User> {
    const user = await this.userModel.findById(userId).lean()

    let participant = user.visibleCalendars.find(participant => participant.calendarId.toString() === calendarId)
    if (participant) {
      return await this.userModel.findByIdAndUpdate({_id: new Types.ObjectId(userId)}, {$pull: {visibleCalendars: participant}}, {new: true})
    }
    return undefined;
  }

  async getCalendarWithEventsForUser(userId: string) {
    const pipeline = [
      {
      $match: {_id: new Types.ObjectId(userId)}
      },
      {
        $unwind:
          {
            path: "$visibleCalendars",
          }
      },
      {
         $lookup:
            {
               from: "calendars",
               localField: "visibleCalendars.calendarId",
               foreignField: "_id",
               as: "visibleCalendar"
            }
      },
      {
      $project: {
          calendar: { $arrayElemAt: [ "$visibleCalendar", 0 ] }
          }
      },
      {
      $project: {
          calendar: 1
          }
      },
      {
         $lookup:
            {
               from: "events",
               localField: "calendar.eventIds",
               foreignField: "_id",
               as: "events"
            }
      },
      {
      $project: {
          calendar: 1,
          events: "$events"
          }
      },
      {
         $lookup:
            {
               from: "users",
               localField: "events.participants.participantId",
               foreignField: "_id",
               as: "participants"
            }
      }
      ]

    return await this.userModel.aggregate(pipeline).exec();
  }
}
