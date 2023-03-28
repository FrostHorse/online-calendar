import { IsDefined, IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsDefined()
  @IsString()
  password: string;
}
