const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const botCommands = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply("Привіт🖐, я бот.🤖😎 Мене створили для того щоб привітати тебе з сьогоднішнім святом🌷🌹🌸🌼🌺!!!\n\r Введіть своє повне ім'я та прізвище на українській мові🇺🇦⌨️." ))
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
// Настя
bot.hears('Анастасія Харченко', async (ctx) => {
    try {
        if (await ctx.message.from.username === 'nastia199212') {
            await ctx.replyWithHTML(`Привіт, ${'Зайцік!😻\n\r' + botCommands.nastyha}`, Markup.inlineKeyboard(
                [
                    [Markup.button.callback("Цікаві факти про твоє ім'я", 'btn_1')],
                    [Markup.button.callback('Музичне вітання', 'btn_2'), Markup.button.callback('Відео вітання', 'btn_3')]
                ]
            ))
        } else {
            await ctx.reply('Я тебе не знаю!')
        }
    } catch (e) {
        console.error(e)
    }
})
//Мама
bot.hears('Тетяна Пуштарик', async (ctx) => {
    try {
        // if (await ctx.message.from.username === 'nastia199212') {
            await ctx.replyWithHTML(`Привіт, ${'Мама Сергія Харченко!😻\n\r' + botCommands.VitannaMama}`, Markup.inlineKeyboard(
                [
                    [Markup.button.callback("Цікаві факти про твоє ім'я", 'tetyana_btn_1')],
                    [Markup.button.callback('Музичне вітання', 'tetyana_btn_2'), Markup.button.callback('Відео вітання', 'tetyana_btn_3')]
                ]
            ))
        // } else {
        //     await ctx.reply('Я тебе не знаю!')
        // }
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

addActionBot('btn_1', './img/nastya_1.jpg', botCommands.infoTextNastyha)
addActionBot('btn_2', './img/2.jpg', botCommands.infoMusicNastyha)
addActionBot('btn_3', './img/3.jpg', botCommands.infoVideoNastyha)

addActionBot('tetyana_btn_1', './img/tetyana_1.jpg', botCommands.infoTextMama)
addActionBot('tetyana_btn_2', './img/2.jpg', botCommands.infoMusicMama)
addActionBot('tetyana_btn_3', './img/3.jpg', botCommands.infoVideoMama)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))