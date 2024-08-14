import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { FindByActorDto, FindSimilarMoviesDto, SortMoviesDto } from './dto/movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getMovies() {
    return this.moviesService.getMovies();
  }

  @Get('popularity')
  byPopularity(@Query() sortMoviesDto: SortMoviesDto) {
    return this.moviesService.sortMoviesByPopularity(sortMoviesDto.order);
  }

  @Get('similar')
  findSimilarMovies(@Query() findSimilarMoviesDto: FindSimilarMoviesDto) {
    return this.moviesService.findSimilarMovies(findSimilarMoviesDto);
  }

  @Get('by-actor')
  findMoviesByActor(@Query() findByActorDto: FindByActorDto) {
    return this.moviesService.findMoviesByActor(findByActorDto.actor);
  }
}
