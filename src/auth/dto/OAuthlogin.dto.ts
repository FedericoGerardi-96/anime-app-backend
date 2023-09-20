import { IsEmail, IsOptional, IsString } from 'class-validator';

export class OAuthlogin {
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly name: string;
  @IsOptional()
  readonly icon: string | null;
}
