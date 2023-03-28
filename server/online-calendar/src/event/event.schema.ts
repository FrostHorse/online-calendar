import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export class Place {
  address: string;

  city: string;

  postalCode: number;
}

@Schema()
export class Events {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    type: Place,
  })
  place: Place;

  @Prop({
    required: true,
  })
  ownerId: string;

  @Prop({
    required: true,
  })
  startDate: Date;

  @Prop({
    required: true,
  })
  endDate: Date;

  @Prop({
    required: true,
  })
  comment: string;

  @Prop({
    required: true,
  })
  allDay: boolean;

  @Prop({
    required: true,
  })
  recurring: boolean;
}
export type EventDocument = HydratedDocument<Events>;

// export const PlaceSchema = SchemaFactory.createForClass(Place);

export const EventSchema = SchemaFactory.createForClass(Events);
