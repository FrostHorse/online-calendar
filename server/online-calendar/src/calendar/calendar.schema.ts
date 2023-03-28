import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
}
export type CalendarDocument = HydratedDocument<Calendar>;

export const CalendarSchema = SchemaFactory.createForClass(Calendar);
