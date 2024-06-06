const {
    Message,
    MessageEmbed
} = require("discord.js");
const Command = require(`../../Structures/Command`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "pb",
            aliases: ["botclear"],
            category: "moderation",
            description: "Purges messages sent by bots.",
            usage: "",
            permissions: [`730459275499012127`]
        });
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {

        let noPermissionsEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> You can not use this command!`,
            title: ':x: Insufficient Permissions! :x:'
        });

        let clearedEmbed = new MessageEmbed({
            color: '#BECCFE',
            description: `${message.member} <:cleanegp:935247774545477704> Cleared **{x}** bots in {channel}!`,
            title: 'Bot Command Clear'
        });

        if (!message.member.roles.cache.some(rl => this.permissions.includes(rl.id))) return message.reply({
            embeds: [noPermissionsEmbed]
        });

        let messages = await message.channel.messages.fetch({
            limit: 100
        });
        messages = await messages.filter(m => m.author.bot);
        let messageIds = [];
        await messages.forEach(m => messageIds.push(m.id));

        if (messageIds.length < 1) return message.reply({
            content: `Unable to clear bot messages. No messages found!`
        });

        await message.channel.bulkDelete(messageIds, true);

        await message.channel.send({
            embeds: [clearedEmbed.setDescription(clearedEmbed.description.replace(`{x}`, messageIds.length).replace(`{channel}`, `${message.channel}`))]
        }).then(m => setTimeout(() => {
            m.delete()
        }, 5000));

    }

}