import { Module } from '@nestjs/common';
import { MyAnimeListService } from './my-anime-list.service';
import { MyAnimeListController } from './my-anime-list.controller';

@Module({
  controllers: [MyAnimeListController],
  providers: [MyAnimeListService]
})
export class MyAnimeListModule {}
