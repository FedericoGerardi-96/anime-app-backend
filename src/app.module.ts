import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MyAnimeListModule } from './my-anime-list/my-anime-list.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    CommonModule,
    CloudinaryModule,
    MyAnimeListModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
