import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { config } from 'dotenv';
import { BotModule } from './bot/bot.module';
config()

@Module({
  imports: [ 
    TelegrafModule.forRoot({
      token: String(process.env.BOT_TOKEN)
    }),
    BotModule
  ],
})
export class AppModule {}
