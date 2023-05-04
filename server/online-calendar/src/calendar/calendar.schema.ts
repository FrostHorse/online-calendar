import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Calendar {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  ownerId: string;

  @Prop({
    required: false,
    default: [],
    type: Types.ObjectId
  })
  eventIds?: Types.ObjectId[];
}
export type CalendarDocument = HydratedDocument<Calendar>;

export const CalendarSchema = SchemaFactory.createForClass(Calendar);
