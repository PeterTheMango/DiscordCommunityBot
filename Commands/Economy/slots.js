const {
    Message,
    MessageEmbed
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const {
    getBalance,
    updateBalance
} = require(`../../Handlers/EconomyHandler`);

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

        let notEnoughArgs_embed = new MessageEmbed({
            description: `${message.member} <:egp_info:884216504336416829> Command usage: \`.slots <amount>!\``,
            color: `RED`
        });

        let notEnough_embed = new MessageEmbed({
            description: `${message.member} <a:egp_no:935209428070854717> You do not have that amount to use in a slot machine!`,
            color: `RED`
        });

        if (args.length < 1) return message.channel.send({
            embeds: [notEnoughArgs_embed]
        });

        let amount = args.shift();

        if (isNaN(parseInt(amount))) return message.channel.send(`**How to use the command?**\n\n\`.slots <amount>\``);

        amount = parseInt(amount);

        let currentBalance = await getBalance(message.member.id);

        if (amount > currentBalance.wallet) return message.channel.send({
            embeds: [notEnough_embed]
        });

        await updateBalance(message.member.id, currentBalance.wallet - amount, currentBalance.stored);

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

        let winningChance = await this.generatePercentage(1, 100);

        if (winningChance >= 70) {
            $ = items[Math.floor(items.length * Math.random())];
            $$ = $;
            $$$ = $$;
        }

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
                });
            }, 3000);
        } else if ($ === $$ && $$ === $$$) {
            //win
            setTimeout(async () => {

                let totalReturn = Math.ceil((await this.generatePercentage(110, 120) / 100) * amount);

                await part1.edit({
                    embeds: [
                        embed2.setColor(`GREEN`)
                        .setDescription((slotsEmbed.description
                            .replace(`<a:slots1:869255958847696966>`, $)
                            .replace(`<a:slots2:869255958608637982>`, $$)
                            .replace(`<a:slots3:869255958482780201>`, $$$)) + `\nResult: **Winner**\nYou gained ${totalReturn} coins!`)
                    ]
                });

                await updateBalance(message.member.id, currentBalance.wallet + totalReturn, currentBalance.stored)
                await updateBalance(message.member.id, currentBalance.wallet + amount, currentBalance.stored);
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
                });
            }, 3000);
        }

    }

    async generatePercentage(x, y) {
        let min = Math.ceil(x);
        let max = Math.floor(y);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}