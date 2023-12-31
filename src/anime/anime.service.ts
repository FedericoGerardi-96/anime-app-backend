import { Injectable } from '@nestjs/common';
import { AddFavoriteAnimeDto } from './dto/add-favorite-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';

@Injectable()
export class AnimeService {
  create(createAnimeDto: AddFavoriteAnimeDto) {
    return 'This action adds a new anime';
  }

  findAll() {
    return `This action returns all anime`;
  }

  findOne(id: number) {
    return `This action returns a #${id} anime`;
  }

  update(id: number, updateAnimeDto: UpdateAnimeDto) {
    return `This action updates a #${id} anime`;
  }

  remove(id: number) {
    return `This action removes a #${id} anime`;
  }
}
