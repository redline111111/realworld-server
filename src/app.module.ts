import { Module, MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import ormconfig from './ormconfig'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './user/middleware/auth.middleware';
import { ProfileModule } from './profile/profile.module';


@Module({
  imports: [TypeOrmModule.forRoot(ormconfig),TagModule, UserModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
