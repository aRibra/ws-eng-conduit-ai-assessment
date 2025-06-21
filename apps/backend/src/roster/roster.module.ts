import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RosterController } from './roster.controller';
import { RosterService } from './roster.service';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RosterController],
  providers: [RosterService],
  exports: [RosterService],
})
export class RosterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'roster', method: RequestMethod.GET });
  }
}
