import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AddFavoriteAnimeDto } from './dto/add-favorite-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post("favorite")
  addAnimeFavorite(@Body() addAnimeFavoriteDto: AddFavoriteAnimeDto) {
    return this.animeService.create(addAnimeFavoriteDto);
  }

  @Get()
  findAll() {
    return this.animeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimeDto: UpdateAnimeDto) {
    return this.animeService.update(+id, updateAnimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animeService.remove(+id);
  }
}
