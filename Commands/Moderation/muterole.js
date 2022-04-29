const {
    Message,
    MessageEmbed
} = require("discord.js");
const Command = require(`../../Structures/Command`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "muterole",
            aliases: [],
            category: "Moderation",
            description: "Creates a mute role for the server. (USE IT ONLY WHEN NEEDED)",
            usage: ""
        })
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {

        const noPermissionEmbed = new MessageEmbed({
            color: "RED",
            title: ":x: Insufficient Permissions! :x:",
            description: `${message.member} <a:egp_no:935209428070854717> You can not use this command!`
        });

        const failedEmbed = new MessageEmbed({
            color: "RED",
            title: ":x: Role Creation Failed! :x:",
            description: `${message.member} <a:egp_no:935209428070854717> Unable to create role! I do not have permissions to do so.`
        });

        const successEmbed = new MessageEmbed({
            color: "GREEN",
            title: "Successfully created Muted role!",
            description: `${message.member} <a:tickticktick:935198882172903434> Muted Role Information Created! Role Information:\n {content}`
        });

        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({
            embeds: [noPermissionEmbed]
        });

        let mutedRole = await message.guild.roles.create({
            name: `Muted`,
            color: `#0d0d0c`,
            mentionable: false
        }).catch(err => message.reply({
            embeds: [failedEmbed]
        }));

        let channels = await message.guild.channels.fetch();
        channels = channels.filter(ch => ch.type === "GUILD_TEXT" || ch.type === "GUILD_CATEGORY");

        await channels.forEach(ch => {

            ch.edit({
                permissionOverwrites: [{
                    id: mutedRole.id,
                    deny: ["ADD_REACTIONS", "ATTACH_FILES", "CREATE_INSTANT_INVITE", "EMBED_LINKS", "SEND_MESSAGES", "SEND_MESSAGES_IN_THREADS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                }]
            });

        });

        await message.channel.send({
            embeds: [successEmbed.setDescription(successEmbed.description.replace(`{content}`, `**• Role:** ${mutedRole}\n**• Role ID:** ${mutedRole.id}`))]
        });

    }

}