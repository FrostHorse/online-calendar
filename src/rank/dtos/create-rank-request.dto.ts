import { IsArray, IsDefined, IsString } from 'class-validator';

export class CreateRankDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsArray()
  @IsDefined()
  permissions: string[];
}
