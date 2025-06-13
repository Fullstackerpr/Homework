import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { GroupModule } from './group/group.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/dangg'), UsersModule, GroupModule],
})
export class AppModule {}
