import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class AttachRankDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  rankId: string;

  @IsDefined()
  @ApiProperty()
  @IsString()
  userId: string;
}
