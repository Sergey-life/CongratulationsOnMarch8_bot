const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const botCommands = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Привіт, ${ctx.message.from.username === 'nastia199212' ?
    'Зайцік!\n\r'+botCommands.nastyha : 
    'Незнакомец!' ||
    ctx.message.from.username === 'Serhiy_Kharchenko' ?
    'Привіт батя!' : 'Ти хто?'}`))
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