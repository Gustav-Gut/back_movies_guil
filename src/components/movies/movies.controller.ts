import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getMovies(@Query('sort') sort: string) {
    return this.moviesService.getMovies(sort);
  }

  @Get(':id')
  getMovie(@Param('id') id: string) {
    return this.moviesService.getMovie(id);
  }
}
