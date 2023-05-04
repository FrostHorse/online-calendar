import { IsDefined, IsString } from 'class-validator';

export class AttachPermissionDto {
  @IsDefined()
  @IsString()
  rankId: string;

  @IsDefined()
  @IsString()
  permissionId: string;
}
