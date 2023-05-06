import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';

export class ModifyParticipationDto {
  @IsDefined()
  @ApiProperty()
  @IsString()
  eventId: string;

  @IsDefined()
  @ApiProperty()
  @IsString()
  participantId: string;

  @IsOptional()
  @Type(() => Boolean)
  @ApiPropertyOptional()
  @IsBoolean()
  canModify?: boolean;
}