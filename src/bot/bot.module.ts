import { Module } from "@nestjs/common";
import { BotUpdate } from "./bot.update";
import { BotService } from "./bot.service";
import { TelegrafModule } from "nestjs-telegraf";


@Module({
  providers: [BotUpdate, BotService],     
})
export class BotModule {}

