import { Type } from 'class-transformer';
import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';

export class ModifyParticipationDto {
  @IsDefined()
  @IsString()
  eventId: string;

  @IsDefined()
  @IsString()
  participantId: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  canModify?: boolean;
}