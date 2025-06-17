import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { v4 as uuidv4 } from 'uuid';
import ytdl from 'ytdl-core';
import * as fs from 'fs'

@Injectable()
export class BotService implements OnModuleInit {
  constructor(@InjectBot() private readonly bot: Telegraf) {}

  async onModuleInit() {
    await this.bot.telegram.setMyCommands([
      { command: 'setting', description: '⚙️ Sozlamalar' },
      { command: 'help', description: '🆘 Yordam' },
      { command: 'search', description: '🔍 Qidiruv' },
      { command: 'popular', description: '🎵 Mashhur musiqalar' },
    ]);
  }

  async handleYouTubeLink(ctx: Context, url: string) {
    const id = uuidv4();
    const videoPath = `./downloads/${id}.mp4`;
    const audioPath = `./downloads/${id}.mp3`;

    const videoStream = ytdl(url, {quality: 'highestVideo'});
    const writeStream = fs.createWriteStream(videoPath)
    


  }

  async onStart(ctx: any) {
    await ctx.reply("👋 Assalomu aleykum @intallmusic_bot xush kelibsiz Yuklab olmoqchi bo'lgan videoga havolani yuboring!");
  }
}
