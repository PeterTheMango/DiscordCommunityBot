const {
    Message,
    MessageEmbed
} = require("discord.js");
const Command = require(`../../Structures/Command`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "slots",
            aliases: ["gamble"],
            category: "Economy",
            description: "Gambles coins through a slot machine.",
            usage: "<amount>"
        })
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {

        let slotsEmbed = new MessageEmbed({
            color: "#eb34c6",
            title: "Slots",
            description: [
                "**Spin**",
                "{slot1} | {slot2} | {slot3}",
                ""
            ].join('\n')
        });

        if (args.length < 1) return message.channel.send(`**How to use the command?**\n\n\`.slots <amount>\``);

        let amount = args.shift();

        if (isNaN(parseInt(amount))) return message.channel.send(`**How to use the command?**\n\n\`.slots <amount>\``);

        amount = parseInt(amount);

        let embed1 = slotsEmbed;
        let part1 = await message.channel.send({
            embeds: [embed1.setDescription(slotsEmbed.description
                .replace(`{slot1}`, `<a:slots1:869255958847696966>`)
                .replace(`{slot2}`, `<a:slots2:869255958608637982>`)
                .replace(`{slot3}`, `<a:slots3:869255958482780201>`)
            )]
        });
        
        let items = [`<:bell2:869255958205984779>`, `<:diamondd:869255958285680722>`, `<:grapess:869255958570881044>`, `<:orangee:869255958575063050>`, `<:pearr:869255958717690006>`, `<:watermelonn:869255958608629811>`];

        let $ = items[Math.floor(items.length * Math.random())];
        let $$ = items[Math.floor(items.length * Math.random())];
        let $$$ = items[Math.floor(items.length * Math.random())];

        let embed2 = slotsEmbed;

        if ($$ !== $ && $$ !== $$$) {
            //lose
            setTimeout(async () => {
                await part1.edit({
                    embeds: [
                        embed2.setColor(`RED`)
                        .setDescription((slotsEmbed.description
                            .replace(`<a:slots1:869255958847696966>`, $)
                            .replace(`<a:slots2:869255958608637982>`, $$)
                            .replace(`<a:slots3:869255958482780201>`, $$$)) + `\nResult: **Loser**\nYou lost ${amount} coins!`)
                    ]
                })
            }, 3000);
        } else if ($ === $$ && $$ === $$$) {
            //win
            setTimeout(async () => {
                await part1.edit({
                    embeds: [
                        embed2.setColor(`GREEN`)
                        .setDescription((slotsEmbed.description
                            .replace(`<a:slots1:869255958847696966>`, $)
                            .replace(`<a:slots2:869255958608637982>`, $$)
                            .replace(`<a:slots3:869255958482780201>`, $$$)) + `\nResult: **Winner**\nYou gained ${totalReturn} coins!`)
                    ]
                })
            }, 3000);
        } else {
            //draw
            setTimeout(async () => {
                await part1.edit({
                    embeds: [
                        embed2.setColor(`YELLOW`)
                        .setDescription((slotsEmbed.description
                            .replace(`<a:slots1:869255958847696966>`, $)
                            .replace(`<a:slots2:869255958608637982>`, $$)
                            .replace(`<a:slots3:869255958482780201>`, $$$)) + `\nResult: **Draw**\nYou didn't lose any coins!`)
                    ]
                })
            }, 3000);
        }

    }

    async generatePercentage(x, y) {
        let min = Math.ceil(x);
        let max = Math.floor(y);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}