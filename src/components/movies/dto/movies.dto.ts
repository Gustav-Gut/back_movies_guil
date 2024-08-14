import { IsString, IsIn, IsArray, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class SortMoviesDto {
  @IsString()
  @IsIn(['ASC', 'DSC'])
  order: 'ASC' | 'DSC';
}

export class FindSimilarMoviesDto {
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => [].concat(value).map((v) => capitalizeEachWord(v)), {
    toClassOnly: true,
  })
  genres: string[];

  @IsNumber()
  @IsOptional()
  imdbRating?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => [].concat(value || []).map((v) => capitalizeEachWord(v)), {
    toClassOnly: true,
  })
  actors?: string[];
}

export class FindByActorDto {
  @IsString()
  @Transform(({ value }) => capitalizeEachWord(value))
  actor: string;
}

function capitalizeEachWord(value: string | string[]): string | string[] {
  if (Array.isArray(value)) {
    return value.map((item) => item.replace(/\b\w/g, (char) => char.toUpperCase()));
  } else {
    return value.replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
