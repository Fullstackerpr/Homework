import { Injectable } from '@nestjs/common';
import { Action, Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { Context, Markup } from 'telegraf';

@Update()
@Injectable()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  private lazy = [5491621573];

  @Start()
  onStart(@Ctx() ctx: Context) {
    return this.botService.onStart(ctx);
  }

  @On('photo')
  onPhoto(@Ctx() ctx: Context) {
    if (ctx.message && 'photo' in ctx.message) {
      for (let lazies of this.lazy) {
        ctx.telegram.sendPhoto(lazies, ctx.message.photo[0].file_id);
      }
    }
  }

  @On('video')
  onVideo(@Ctx() ctx: Context) {
    if (ctx.message && 'video' in ctx.message) {
      for (let lazies of this.lazy) {
        ctx.telegram.sendVideo(lazies, ctx.message.video.file_id);
      }
    }
  }

  @On('audio')
  onAudio(@Ctx() ctx: Context) {
    if (ctx.message && 'audio' in ctx.message) {
      for (let lazies of this.lazy) {
        ctx.telegram.sendAudio(lazies, ctx.message.audio.file_id);
      }
    }
  }

  @On('voice')
  onVoice(@Ctx() ctx: Context) {
    if (ctx.message && 'voice' in ctx.message) {
      for (let lazies of this.lazy) {
        ctx.telegram.sendVoice(lazies, ctx.message.voice.file_id);
      }
    }
  }

  @Hears('Setting')
  onSetting(@Ctx() ctx: Context) {
    ctx.reply('⚙️ Setting section!', {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🌐 select language', callback_data: 'setting:language' }],
          [{ text: '⬅️ Orqaga', callback_data: 'back_to_main' }],
        ],
      },
    });
  }

  @Action('setting:language')
  languageSetting(@Ctx() ctx: Context) {
    ctx.editMessageText('Select language:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🇺🇿 Uzbekcha', callback_data: 'lang:uz' }],
          [{ text: '🇬🇧 English', callback_data: 'lang:en' }],
        ],
      },
    });
  }

  @Action(/lan:(.+)/)
  async setLanguage(@Ctx() ctx: any) {
    const match = ctx.match as RegExpMatchArray;
    const lang = match[1];

    await ctx.answerCbQuery();
    await ctx.editMessageText(
      `✅ Til: ${lang === 'uz' ? 'Uzbekcha' : 'Inglizcha'}`,
    );
  }

  @Hears('Help')
  onHelp(@Ctx() ctx: Context) {
    ctx.reply('🆘 for help: +998940010101');
  }

  @Hears('Menu')
  onMenu(@Ctx() ctx: Context) {
    ctx.reply(
      'Choose one of following:',
      Markup.keyboard([
        ['📅 Bookin date', '🏢 Filial'],
        ['🪑 Space', '🆘Help'],
        ['⚙️ Sozlamalar'],
      ]).resize(),
    );
  }

  @Hears('Space')
  chooseRoom(@Ctx() ctx: Context) {
    const rooms = ['1-room', '2-room', 'VIP-room'];
    const keyboard = rooms.map((room) => [
      { text: room, callback_data: `room:${room}` },
    ]);

    ctx.reply('Select room:', {
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  }

  @Action(/room:(.+)/)
  async setRoom(@Ctx() ctx: any) {
    const match = ctx.match as RegExpMatchArray;
    const room = match[1];

    await ctx.answerCbQuery();
    await ctx.editMessageText(`✅ You selected: ${room}`);
  }

  @Hears('Date')
  onDate(@Ctx() ctx: Context) {
    ctx.reply('📅 enter date: ' + new Date());
  }

  @Hears('Filial')
  async onFilial(@Ctx() ctx: Context) {
    await ctx.reply('🏢 select branch: ', {
      reply_markup: {
        inline_keyboard: [
          [{ text: '📍 Chilonzor', callback_data: 'branch:chilonzor' }],
          [{ text: '📍 Yunusobod', callback_data: 'branch:yunusobod' }],
        ],
      },
    });
  }

  @Action(/branch:(.+)/)
  async setBranch(@Ctx() ctx: any) {
    const match = ctx.match as RegExpMatchArray;
    const branch = match[1];

    await ctx.answerCbQuery();
    await ctx.editMessageText(`✅ Selected branch: ${branch}`);
  }
}
