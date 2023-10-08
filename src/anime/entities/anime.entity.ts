import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AnimeFavorite extends Document {
  _id?: string;
  @Prop({ required: true })
  _idUser: string;
  @Prop({ required: true })
  _mal_id: string;
  @Prop({ minlength: 2, maxlength: 100, required: true })
  title: string;
  @Prop({ maxlength: 1000, default: '' })
  description: string;
  @Prop({ default: 'Watching' })
  status: ['Watching' | 'Completed' | 'On Hold' | 'Dropped' | 'Plan to Watch'];
  @Prop({
    type: String,
    default:
      'https://res.cloudinary.com/do3n04ysn/image/upload/v1696709013/anime-app/ydth0excpvsbsr457zce.jpg',
  })
  image: string;
  @Prop({ default: false })
  finish: boolean;
  @Prop({ default: 1 })
  chapter_going: number | 'Finished';
}

export const AnimeFavoriteSchema = SchemaFactory.createForClass(AnimeFavorite);

@Schema({ _id: false, versionKey: false })
class AnimeSeason {
  @Prop({ type: Types.ObjectId, ref: 'AnimeFavorite', required: true })
  anime: AnimeFavorite;
  @Prop({ required: true })
  season: ['Winter' | 'Spring' | 'Summer' | 'Fall' | 'Unknown'];
  @Prop({ required: true })
  year: number;
  @Prop({ required: true })
  day: ['Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday' | 'Unknown'];
  @Prop({ required: true })
  platform: ['Crunchyroll' | 'Pirate Streaming' | 'Unknown'];
}

@Schema()
export class AnimeList extends Document {
  _id?: string;
  @Prop({ required: true })
  _idUser: string;
  @Prop({ minlength: 2, maxlength: 100, required: true })
  title: string;
  @Prop({ maxlength: 1000, default: '' })
  description: string;
  @Prop({ required: true })
  animes: AnimeSeason[];
}

export const AnimeListSchema = SchemaFactory.createForClass(AnimeList);