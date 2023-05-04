import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Rank {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    default:[],
    type: Types.ObjectId
  })
  permissions: Types.ObjectId[];
}

export type RankDocument = HydratedDocument<Rank>;

export const RankSchema = SchemaFactory.createForClass(Rank);
