import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Rank {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  permissions: string[];
}

export type RankDocument = HydratedDocument<Rank>;

export const RankSchema = SchemaFactory.createForClass(Rank);
