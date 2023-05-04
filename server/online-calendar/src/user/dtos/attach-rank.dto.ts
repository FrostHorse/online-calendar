import { IsDefined, IsString } from 'class-validator';

export class AttachRankDto {
  @IsDefined()
  @IsString()
  rankId: string;

  @IsDefined()
  @IsString()
  userId: string;
}
