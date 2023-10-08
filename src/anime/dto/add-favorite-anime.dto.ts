import {
  IsOptional,
  IsString,
  MaxLength,
  IsBoolean,
  IsMongoId,
} from 'class-validator';

export class AddFavoriteAnimeDto {
  @IsString()
  @IsMongoId()
  _idUser: string;
  @IsOptional()
  @IsString()
  @MaxLength(10)
  _mal_id: string;
  @IsString()
  @MaxLength(100)
  title: string;
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description: string;
  status: ['Watching' | 'Completed' | 'On Hold' | 'Dropped' | 'Plan to Watch'];
  @IsOptional()
  @IsString()
  image: string;
  @IsOptional()
  @IsBoolean()
  finish: boolean;
  @IsOptional()
  chapter_going: number | 'Finished';
  // @IsOptional()
  // season: ['Winter' | 'Spring' | 'Summer' | 'Fall' | 'Unknown'];
  // @IsOptional()
  // @IsNumber()
  // year: number;
  // @IsOptional()
  // platform: ['Crunchyroll' | 'Pirate Streaming' | 'Unknown'];
}
