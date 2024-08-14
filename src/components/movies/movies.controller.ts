import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SortMoviesDto } from './dto/movies.dto';

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
}
