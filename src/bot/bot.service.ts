import { Injectable } from "@nestjs/common";
import { Context, Markup } from "telegraf";

@Injectable()

export class BotService{
    async onStart(ctx: Context){
        try {
            console.log(ctx.from)
            ctx.reply('Botga xush kelibsiz!', Markup.keyboard([
                ['⚙️Setting', '🆘Help'],
                ['Menu', '🪑Space'],
                ['📅Date', '🏢Filial']
            ])
            .resize()
            .oneTime()
        )
        } catch (error) {
            console.log(error)
        }
    }
}