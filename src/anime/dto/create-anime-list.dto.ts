import {
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAnimeListDto {
  @IsString()
  @IsMongoId()
  _idUser: string;
  @IsString()
  @MaxLength(50)
  title: string;
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description: string;
}
