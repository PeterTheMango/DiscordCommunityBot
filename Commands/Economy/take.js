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
            name: "take",
            aliases: ["withdraw"],
            category: "Economy",
            description: "Withdraws from the users stored credits.",
            usage: "<amount>"
        })
    }

    /**
     *
     * @param {Message} message
     * @param {String[]} args
     */
    async execute(message, args) {

        // Embeds
        let notEnough_embed = new MessageEmbed({
            description: `${message.member} <a:egp_no:935209428070854717> You do not have that amount to take out!`,
            color: `RED`
        });
        
        let notEnoughArgs_embed = new MessageEmbed({
            description: `${message.member} <:egp_info:884216504336416829> Command usage: \`.take amount!\``,
            color: `RED`
        });
	
        let take_embed = new MessageEmbed({
            description: `${message.member} <a:tickticktick:935198882172903434> Successfully transferred %amount% credits to your wallet!`,
            color: "GREEN"
        });

        if (args.length < 1) return message.channel.send({
            embeds: [notEnoughArgs_embed]
        });

        let amount = args.shift();

        if (isNaN(parseInt(amount)) && amount !== `all`) return message.channel.send({
            embeds: [notEnough_embed]
        });

        let userBalance = await getBalance(message.member.id);

        if (amount === "all") {
            amount = userBalance.stored;
        } else {
            amount = parseInt(amount);
        }

        if (amount > userBalance.stored || amount < 1) return message.channel.send({
            embeds: [notEnough_embed]
        });

        await updateBalance(message.member.id, userBalance.wallet + amount, userBalance.stored - amount);

        await message.channel.send({
            embeds: [take_embed.setDescription(take_embed.description.replace(`%amount%`, `**${amount}**`))]
        });


    }

}