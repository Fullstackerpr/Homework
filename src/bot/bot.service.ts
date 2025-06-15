import { Injectable } from "@nestjs/common";
import { Context, Markup } from "telegraf";

@Injectable()

export class BotService{
    async onStart(ctx: Context){
        try {
            ctx.reply('Botga xush kelibsiz!', Markup.keyboard([
                ['Setting', 'Help'],
                ['Space', 'Date'],
                ['Location', 'Filial']
            ])
            .resize()
            .oneTime()
        )
        } catch (error) {
            console.log(error)
        }
    }
}