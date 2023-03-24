import { IsDefined, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsDefined()
  @IsString()
  name: string;
}
