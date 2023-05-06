import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsObject,
  IsString,
} from 'class-validator';
import { Place } from '../event.schema';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @IsDefined()
  @ApiProperty()
  @IsString()
  name: string;

  @IsDefined()
  @ApiProperty()
  @IsObject()
  place: Place;

  @IsDefined()
  @ApiProperty()
  @IsString()
  ownerId: string;

  @IsDefined()
  @Type(() => Date)
  @ApiProperty()
  @IsDate()
  startDate: Date;

  @IsDefined()
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @ApiProperty()
  @IsDefined()
  @IsString()
  comment: string;

  @IsDefined()
  @Type(() => Boolean)
  @ApiProperty()
  @IsBoolean()
  allDay: boolean;

  @IsDefined()
  @Type(() => Boolean)
  @ApiProperty()
  @IsBoolean()
  recurring: boolean;
}
