import { PartialType } from '@nestjs/mapped-types';
import { GetAnimeSeasonDto } from './getAnimeSeason.dto';

export class UpdateMyAnimeListDto extends PartialType(GetAnimeSeasonDto) {}
