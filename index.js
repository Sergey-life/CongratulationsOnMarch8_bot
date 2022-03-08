const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const botCommands = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply("Привіт, я втворений для того щоб привітати тебе з 8 Березня!!!\n\r Ведіть своє повне ім'я на українській мові." ))
bot.help((ctx) => ctx.reply(botCommands.commands))
bot.command('interesting', async (ctx) => {
    try {
        await ctx.replyWithHTML('<strong>Про це свято</strong>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Цікаві факти', 'btn_1')],
                [Markup.button.callback('Музика', 'btn_2'), Markup.button.callback('Відео', 'btn_3')]
            ]
        ))
    } catch (e) {
        console.error(e)
    }
})

bot.hears('Анастасія', async (ctx) => {
    try {
        if (await ctx.message.from.username === 'nastia199212') {
            await ctx.replyWithHTML(`Привіт, ${'Зайцік!😻\n\r' + botCommands.nastyha}`, Markup.inlineKeyboard(
                [
                    [Markup.button.callback('Цікаві факти', 'btn_1')],
                    [Markup.button.callback('Музика', 'btn_2'), Markup.button.callback('Відео', 'btn_3')]
                ]
            ))
        } else {
            await ctx.reply('Я тебе не знаю!')
        }
    } catch (e) {
        console.error(e)
    }
})

function addActionBot(idButton, src, data) {
    bot.action(idButton, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if (src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(data, {
                disable_web_page_preview: true
            })
        } catch (e) {
            console.error(e)
        }
    })
}

addActionBot('btn_1', './img/1.jpg', botCommands.infoText)
addActionBot('btn_2', './img/2.jpg', botCommands.infoMusic)
addActionBot('btn_3', './img/3.jpg', botCommands.infoVideo)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))