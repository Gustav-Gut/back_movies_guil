import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { FindSimilarMoviesDto, SortMoviesDto } from './dto/movies.dto';

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
}
