const {
    Message,
    MessageEmbed
} = require("discord.js");
const Command = require(`../../Structures/Command`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "novcrole",
            aliases: [],
            category: "Moderation",
            description: "Creates a new NOVC role for your server. (USE IT ONLY WHEN NEEDED)",
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
            name: `NOVC`,
            color: `#0d0d0c`,
            mentionable: false
        }).catch(err => message.reply({
            embeds: [failedEmbed]
        }));

        let channels = await message.guild.channels.fetch();
        channels = channels.filter(ch => ch.type === "GUILD_VOICE" || ch.type === "GUILD_CATEGORY");

        await channels.forEach(ch => {

            ch.edit({
                permissionOverwrites: [{
                    id: mutedRole.id,
                    deny: ["CONNECT", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "MUTE_MEMBERS", "PRIORITY_SPEAKER", "SPEAK", "STREAM"]
                }]
            });

        });

        await message.channel.send({
            embeds: [successEmbed.setDescription(successEmbed.description.replace(`{content}`, `**• Role:** ${mutedRole}\n**• Role ID:** ${mutedRole.id}`))]
        });
    }

}