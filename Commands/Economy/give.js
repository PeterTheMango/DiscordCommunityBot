const {
    Message,
    MessageEmbed
} = require("discord.js");
const {
    getBalance,
    updateBalance
} = require("../../Handlers/EconomyHandler");
const Command = require(`../../Structures/Command`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "",
            aliases: [],
            category: "",
            description: "",
            usage: ""
        })
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {

        const noUserEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> That user is not in this server!`,
            title: ':x: USER NOT FOUND :x:'
        });

        const noArgsEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> Please provide a **user** and a **amount** to give!`
        });

        const noSelfEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> You are not allowed to transfer money to yourself!`
        });

        const noBotEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> You cannot give credits to a bot!`
        });

        const noNumberEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> Please provide a **number** amount to give to that user!`
        });

        if (args.length < 2) return message.channel.send({
            embeds: [noArgsEmbed]
        });

        let user;
        if (message.mentions.members.size === 1) {
            args.shift();
            user = message.mentions.members.first()
        } else {
            user = await message.guild.members.fetch(args.shift()).catch(err => user = null);
        }

        if (!user) return message.channel.send({
            embeds: [noUserEmbed]
        });

        if (user.user.bot) return message.channel.send({
            embeds: [noBotEmbed]
        });

        if (user.id === message.member.id) return message.channel.send({
            embeds: [noSelfEmbed]
        });

        let amount = args.shift();

        if (isNaN(parseInt(amount)) && amount !== "all") return message.channel.send({
            embeds: [noNumberEmbed]
        });

        let selfBalance = await getBalance(message.member.id);
        let userBalance = await getBalance(user.id);

        if (amount === 'all') {
            amount = selfBalance.wallet;
        } else {
            amount = parseInt(amount);
        }

        if (amount > selfBalance.wallet || amount < 1) return message.channel.send(`<a:egp_no:935209428070854717> ${message.member} **You do not have sufficient credits to give!**`);

        await updateBalance(message.member.id, selfBalance.wallet - amount, selfBalance.stored);
        await updateBalance(user.id, userBalance.wallet + amount, userBalance.stored);

        message.channel.send(`<a:tickticktick:935198882172903434> ${message.member} You've successfully given ${user} **${amount}** credits!`)

    }

}