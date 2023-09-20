import { Controller, Get, Post, Param } from '@nestjs/common';
import { MyAnimeListService } from './my-anime-list.service';
import { GetAnimeSeasonDto } from './dto/getAnimeSeason.dto';
import { UpdateMyAnimeListDto } from './dto/update-my-anime-list.dto';

@Controller('my-anime-list')
export class MyAnimeListController {
  constructor(private readonly myAnimeListService: MyAnimeListService) {}

  @Post("get-anime-season/:page/:totalPerPage")
  GetAnimeSeason(@Param('page') page: string,@Param('totalPerPage') totalPerPage: string) {
    console.log("get-anime-season")
    return this.myAnimeListService.GetAnimeSeason(page,totalPerPage);
  }

  @Get("get-anime-day-of-the-season")
  GetAnimeTheDailyOfTheSeason() {
    console.log("get-anime-day-of-the-season")
    return this.myAnimeListService.GetAnimeTheDailyOfTheSeason();
  }
}
