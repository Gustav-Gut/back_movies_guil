import { IsString, IsIn, IsArray, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class SortMoviesDto {
  @IsString()
  @IsIn(['ASC', 'DSC'])
  order: 'ASC' | 'DSC';
}

export class FindSimilarMoviesDto {
  @Transform(({ value }) => [].concat(value), { toClassOnly: true })
  @IsString({ each: true })
  @IsArray()
  genres: string[];

  @IsNumber()
  @IsOptional()
  imdbRating?: number;

  @Transform(({ value }) => [].concat(value || []), { toClassOnly: true })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  actors?: string[];
}

export class FindByActorDto {
  @IsString()
  @Transform(({ value }) => capitalizeEachWord(value))
  actor: string;
}

function capitalizeEachWord(value: string): string {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}
