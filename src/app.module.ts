import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesController } from './components/movies/movies.controller';
import { MoviesService } from './components/movies/movies.service';
import { MoviesModule } from './components/movies/movies.module';

@Module({
  imports: [MoviesModule],
  controllers: [AppController, MoviesController],
  providers: [AppService, MoviesService],
})
export class AppModule {}
