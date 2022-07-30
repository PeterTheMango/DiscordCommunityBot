const {
    Message,
    MessageEmbed
} = require("discord.js");
const Command = require(`../../Structures/Command`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "appeal",
            aliases: [],
            category: "Fun",
            description: "Appeal link",
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
            color: 'RANDOM',
            description: `:link: https://discord.gg/dHcrzbKvAT :link:`
        });

        const userNotFoundEmbed = new MessageEmbed({
            color: 'RANDOM',
            description: `:link: https://discord.gg/dHcrzbKvAT :link:`
        });

        const hugEmbed = new MessageEmbed({
            color: 'RANDOM',
            description: `:link: https://discord.gg/dHcrzbKvAT :link:`
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