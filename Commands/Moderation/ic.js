const {
    Message,
    MessageEmbed
} = require("discord.js");
const Command = require(`../../Structures/Command`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "ic",
            aliases: ["imageclear"],
            category: "moderation",
            description: "Clears messages with images.",
            usage: "",
            permissions: [`889999630702632970`]
        });
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {

        await message.delete();

        let noPermissionsEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> You can not use this command!`,
            title: ':x: Insufficient Permissions! :x:'
        });

        let clearedEmbed = new MessageEmbed({
            color: '#BECCFE',
            description: `${message.member} <:cleanegp:935247774545477704> Cleared **{x}** images in {channel}!`,
            title: 'Image Clear'
        });

        if (!message.member.roles.cache.some(rl => this.permissions.includes(rl.id))) return message.reply({
            embeds: [noPermissionsEmbed]
        });

        let messages = await message.channel.messages.fetch({
            limit: 100
        });
        messages = await messages.filter(m => (m.attachments.size >= 1 || m.embeds.length >= 1) && !m.author.bot);
        let messageIds = [];
        await messages.forEach(m => messageIds.push(m.id));

        await message.channel.bulkDelete(messageIds, true);

        await message.channel.send({
            embeds: [clearedEmbed.setDescription(clearedEmbed.description.replace(`{x}`, messageIds.length).replace(`{channel}`, `${message.channel}`))]
        }).then(m => setTimeout(() => {
            m.delete()
        }, 5000));

    }

}