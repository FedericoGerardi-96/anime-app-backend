import { IsNumber, IsOptional } from 'class-validator';

export class GetAnimeSeasonDto {
  @IsNumber()
  @IsOptional()
  page: number;
}
