import { IsOptional, IsString } from 'class-validator';

export class UpdateCalendarDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  ownerId?: string;
}
