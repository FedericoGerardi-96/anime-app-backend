import { Injectable } from '@nestjs/common';
import { GetAnimeSeasonDto } from './dto/getAnimeSeason.dto';
import { UpdateMyAnimeListDto } from './dto/update-my-anime-list.dto';
import { ISeasonAnime } from './interfaces/seasonAnime.interface';

@Injectable()
export class MyAnimeListService {
  baseUrl = 'https://api.jikan.moe/v4';
  daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  async GetAnimeSeason(page: string, totalPerPage: string) {
    const pageNumber = page ? +page : '1';
    const resp = await fetch(
      `${this.baseUrl}/seasons/now?page=${pageNumber}&limit=${totalPerPage}`,
    );
    if (!resp.ok) {
      throw new Error('Error to get anime season');
    }
    const data: ISeasonAnime = await resp.json();
    return data;
  }

  async GetAnimeTheDailyOfTheSeason() {
    const today = new Date();
    const dayName = this.daysOfWeek[today.getDay()];
    const resp = await fetch(`${this.baseUrl}/schedules?filter=${dayName}`);
    if (!resp.ok) {
      throw new Error('Error to get anime season');
    }
    const data: ISeasonAnime = await resp.json();
    return data;
  }
}
