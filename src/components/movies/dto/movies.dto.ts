import { IsString, IsIn } from 'class-validator';

export class SortMoviesDto {
  @IsString()
  @IsIn(['ASC', 'DSC'])
  order: 'ASC' | 'DSC';
}
