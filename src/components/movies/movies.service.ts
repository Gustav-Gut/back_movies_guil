import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class MoviesService {
  private readonly movies = [];

  constructor() {
    this.movies = this.loadMovies();
  }

  private loadMovies() {
    const filePath = join(process.cwd(), 'db', 'movies.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  }

  getMovies(sort: string) {
    console.log('all movies -->', this.movies);
    return this.movies;
  }

  getMovie(id: string) {
    return this.movies.find((movie) => movie.id === id);
  }
}
