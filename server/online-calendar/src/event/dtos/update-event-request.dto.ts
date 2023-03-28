import {
  IsBoolean,
  IsDate,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Place } from '../event.schema';
import { Type } from 'class-transformer';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsObject()
  place?: Place;

  @IsOptional()
  @IsString()
  ownerId?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  allDay?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  recurring?: boolean;
}
