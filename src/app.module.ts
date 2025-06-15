import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '7010606519:AAFvdjyY0D8l3307PmFdWVCmtUl1ozuepmQ'
    }),
    BotModule
  ]
})
export class AppModule {}
