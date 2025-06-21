// apps/backend/src/roster/roster.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { User } from '../user/user.entity';
import { RosterDto } from './dto/roster.dto';

@Injectable()
export class RosterService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async getRosterStats(): Promise<RosterDto[]> {
    try {
      const qb = this.userRepository.createQueryBuilder('user');
      const result = await qb
        .leftJoin('user.articles', 'articles')
        .leftJoin('articles.favorites', 'article_favorites')
        .select([
          'user.username AS username',
          'user.id AS profileId',
          'COALESCE(COUNT(articles.id), 0) AS totalArticles',
          'COALESCE(COUNT(article_favorites.id), 0) AS totalFavorites',
          'MIN(articles.created_at) AS firstArticleDate',
        ])
        .groupBy('user.id')
        .execute('all', true);

      return result.map((row: any) => ({
        username: row.username,
        profileId: Number(row.profileId),
        totalArticles: Number(row.totalArticles),
        totalFavorites: Number(row.totalFavorites),
        firstArticleDate: row.firstArticleDate || null,
      }));
    } catch (error) {
      console.error('RosterService error:', error);
      throw new HttpException('Failed to fetch roster stats', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
