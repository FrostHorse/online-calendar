import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export class VisibleCalendar {
  calendarId: Types.ObjectId
  canModify: boolean
}

@Schema()
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  phoneNumber: string;

  @Prop({
    required: false,
    default: [],
    type: VisibleCalendar
  })
  visibleCalendars?: VisibleCalendar[];
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
