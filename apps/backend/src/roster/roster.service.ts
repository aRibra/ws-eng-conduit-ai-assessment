import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { RosterDto } from './dto/roster.dto';

@Injectable()
export class RosterService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getRosterStats(): Promise<RosterDto[]> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.articles', 'articles')
      .leftJoin('articles.favorites', 'article_favorites')
      .select('user.username', 'username')
      .addSelect('user.id', 'profileId')
      .addSelect('COUNT(articles.id)', 'totalArticles')
      .addSelect('COUNT(article_favorites.id)', 'totalFavorites')
      .addSelect('MIN(articles.created_at)', 'firstArticleDate')
      .groupBy('user.id');

    const result = await query.getRawMany();

    return result.map(row => ({
      username: row.username,
      profileId: row.profileId,
      totalArticles: Number(row.totalArticles) || 0,
      totalFavorites: Number(row.totalFavorites) || 0,
      firstArticleDate: row.firstArticleDate || null,
    }));
  }
}
