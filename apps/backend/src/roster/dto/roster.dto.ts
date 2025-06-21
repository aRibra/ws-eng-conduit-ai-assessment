import { IsString, IsNumber, IsOptional } from 'class-validator';

export class RosterDto {
  @IsString()
  username: string;

  @IsNumber()
  profileId: number;

  @IsNumber()
  totalArticles: number;

  @IsNumber()
  totalFavorites: number;

  @IsOptional()
  @IsString()
  firstArticleDate: string | null;
}
