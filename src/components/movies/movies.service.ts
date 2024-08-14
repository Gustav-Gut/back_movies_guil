import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Movie } from '../../interfaces/mavies.interface';

@Injectable()
export class MoviesService {
  private readonly movies: Movie[];

  constructor() {
    this.movies = this.loadMovies();
  }

  private loadMovies() {
    const filePath = join(process.cwd(), 'db', 'movies.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  }

  getMovies() {
    return this.movies;
  }

  sortMoviesByPopularity(order: 'ASC' | 'DSC'): Movie[] {
    const { maxViewerCount, maxRatingsCount } = this.getMaxValues();
    return this.movies
      .map((movie) => ({
        ...movie,
        popularity: this.calculatePopularity(movie, maxViewerCount, maxRatingsCount),
      }))
      .sort((a, b) => {
        if (order === 'DSC') {
          return b.popularity - a.popularity;
        } else {
          return a.popularity - b.popularity;
        }
      });
  }

  //get max values for estimate the popularity
  private getMaxValues() {
    const maxViewerCount = Math.max(...this.movies.map((movie) => movie.viewerCount));
    const maxRatingsCount = Math.max(...this.movies.map((movie) => movie.ratings.length));
    return { maxViewerCount, maxRatingsCount };
  }

  //use max values of viewers and rating to normalize data
  private calculatePopularity(
    movie: Movie,
    maxViewerCount: number,
    maxRatingsCount: number,
  ): number {
    const avgRating =
      movie.ratings.reduce((acc, cur) => acc + cur, 0) / movie.ratings.length;
    const normalizedViewerCount = movie.viewerCount / maxViewerCount;
    const normalizedRatingsCount = movie.ratings.length / maxRatingsCount;

    //this calculate assign weight in the popularity
    return 0.5 * avgRating + 0.3 * normalizedViewerCount + 0.2 * normalizedRatingsCount;
  }
}
