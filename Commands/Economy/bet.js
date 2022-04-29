const {
    Message,
    MessageEmbed
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const {
    getBalance,
    updateBalance
} = require(`../../Handlers/EconomyHandler`);
const Config = require(`../../Assets/Config.json`);


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "bet",
            aliases: ["gamble"],
            category: "Economy",
            description: "Gambles at least 100 credits.",
            usage: "<amount>"
        })
    }

    /**
     *
     * @param {Message} message
     * @param {String[]} args
     */
    async execute(message, args) {

        const noNumberEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> You do not have enough to bet that amount!`
        });

        const winEmbed = new MessageEmbed({
            color: 'GREEN',
            description: `${message.member} <a:tickticktick:935198882172903434> You bet **{amount}** credits and won **{return}** credits!`
        });

        const lossEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> You bet **{amount}** credits and lost **{return}** credits!`
        });

        if (args.length < 1) return message.channel.send(`${message.member} <:777:935206815124291594> You can bet a minimum amount of **${Config.economy.bet.mininum_bet}** credits <:coinegp:935198385902850058>`)

        let amount = args.shift();

        if (isNaN(parseInt(amount)) && amount !== 'all') return message.channel.send(`${message.member} <:777:935206815124291594> You can bet a minimum amount of **${Config.economy.bet.mininum_bet}** credits <:coinegp:935198385902850058>`);

        let userBalance = await getBalance(message.member.id);

        if (amount === 'all') {
            amount = userBalance.wallet
        } else {
            amount = parseInt(amount);
        }

        if (amount < Config.economy.bet.mininum_bet) return message.channel.send(`${message.member} <:777:935206815124291594> You can bet a minimum amount of **${Config.economy.bet.mininum_bet}** credits <:coinegp:935198385902850058>`);

        if (amount > userBalance.wallet) return message.channel.send({
            embeds: [noNumberEmbed]
        });

        let win = false;

        let percentage = await this.generatePercentage(1, 100);

        if (percentage <= Config.economy.bet.fail_rate) {
            win = false;
        } else {
            win = true;
        }

        if (!win) {
            await updateBalance(message.member.id, userBalance.wallet - amount, userBalance.stored);
            return message.channel.send({
                embeds: [lossEmbed.setDescription(lossEmbed.description.replace(`{amount}`, amount).replace(`{return}`, amount))]
            });
        }

        let returnPercentage = await this.generatePercentage(100, Config.economy.bet.max_return);
        let totalReturn = Math.ceil((returnPercentage / 100) * amount);

        await updateBalance(message.member.id, userBalance.wallet + totalReturn, userBalance.stored);

        message.channel.send({
            embeds: [winEmbed.setDescription(winEmbed.description.replace('{amount}', amount).replace('{return}', totalReturn))]
        });

    }

    async generatePercentage(x, y) {
        let min = Math.ceil(x);
        let max = Math.floor(y);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}