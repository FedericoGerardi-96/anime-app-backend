import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly name: string;
  @MinLength(8)
  readonly password: string;
}
