const {
    Message,
    MessageEmbed
} = require("discord.js");
const Command = require(`../../Structures/Command`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "meow",
            aliases: [],
            category: "Fun",
            description: "meow for a user",
            usage: "<user>"
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
            description: `${message.member} <a:egp_no:935209428070854717> Who do you want to meow for?`
        });

        const userNotFoundEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> This user is not in the server!`
        });

        const hugEmbed = new MessageEmbed({
            color: 'RANDOM',
            description: `${message.member} **meowed for** {user}!`
        });

        if (args.length < 1) return message.channel.send({
            embeds: [noUserEmbed]
        });

        let user = await message.mentions.users.first();

        if (!user) return message.channel.send({
            embeds: [userNotFoundEmbed]
        });

        await message.channel.send({
            embeds: [hugEmbed.setDescription(hugEmbed.description.replace(`{user}`, `${user}`))]
        });

    }

}