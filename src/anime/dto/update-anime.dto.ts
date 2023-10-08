import { PartialType } from '@nestjs/mapped-types';
import { AddFavoriteAnimeDto } from './add-favorite-anime.dto';

export class UpdateAnimeDto extends PartialType(AddFavoriteAnimeDto) {}
