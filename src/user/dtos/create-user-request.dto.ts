import { IsDefined, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsDefined()
  @IsString()
  password: string;

  @IsDefined()
  @IsString()
  phoneNumber: string;
}
