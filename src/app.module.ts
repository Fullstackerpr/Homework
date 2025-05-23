import { Module } from '@nestjs/common';
import { CountryModule } from './country/country.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from './country/model/country.entity';
import { User } from './user/models/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      password: String(process.env.PG_PASS),
      username: process.env.PG_USER,
      database: process.env.PG_DB,
      synchronize: true,
      autoLoadModels: true,
      logging: false,
      models: [User, Country]
    }),
    UserModule, 
    CountryModule
  ],
})
export class AppModule {}
