import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Permission {
  @Prop({
    required: true,
  })
  name: string;
}

export type PermissionDocument = HydratedDocument<Permission>;

export const PermissionSchema = SchemaFactory.createForClass(Permission);
