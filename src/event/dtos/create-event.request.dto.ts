import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsObject,
  IsString,
} from 'class-validator';
import { Place } from '../event.schema';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsObject()
  place: Place;

  @IsDefined()
  @IsString()
  ownerId: string;

  @IsDefined()
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @IsDefined()
  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsDefined()
  @IsString()
  comment: string;

  @IsDefined()
  @Type(() => Boolean)
  @IsBoolean()
  allDay: boolean;

  @IsDefined()
  @Type(() => Boolean)
  @IsBoolean()
  recurring: boolean;
}
