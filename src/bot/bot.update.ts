import { Injectable } from "@nestjs/common";
import { Ctx, On, Start, Update } from "nestjs-telegraf";
import { BotService } from "./bot.service";
import { Context } from "telegraf";
import { on } from "events";

@Update()
@Injectable()
export class BotUpdate{
    constructor(private readonly botService: BotService){ }

    private lazy = [5491621573];

    @Start()
    onStart(@Ctx() ctx: Context){
        return this.botService.onStart(ctx)
    }

    @On('text')
    onText(@Ctx() ctx: Context){
        if(ctx.message && 'text' in ctx.message){
            for (let lazies of this.lazy){
                ctx.telegram.sendMessage(lazies, 'Visca Barca ⚽️')
            }
        }
    }

    @On('photo')
    onPhoto(@Ctx() ctx: Context){
        if(ctx.message && 'photo' in ctx.message){
            for (let lazies of this.lazy){
                ctx.telegram.sendPhoto(lazies, ctx.message.photo[0].file_id)
            }
        }
    }

    @On('video')
    onVideo(@Ctx() ctx: Context){
        if(ctx.message && 'video' in ctx.message){
            for (let lazies of this.lazy){
                ctx.telegram.sendVideo(lazies, ctx.message.video.file_id)
            }
        }
    }

    @On('audio')
    onAudio(@Ctx() ctx: Context) {
        if(ctx.message && 'audio' in ctx.message){
            for (let lazies of this.lazy){
                ctx.telegram.sendAudio(lazies, ctx.message.audio.file_id)
            }
        }
    }

    @On('voice')
    onVoice(@Ctx() ctx: Context) {
        if(ctx.message && 'voice' in ctx.message){
            for (let lazies of this.lazy){
                ctx.telegram.sendVoice(lazies, ctx.message.voice.file_id)
            }
        }
    }
}