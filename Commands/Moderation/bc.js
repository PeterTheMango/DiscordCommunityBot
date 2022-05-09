const {
    Message,
    MessageEmbed
} = require("discord.js");
const Command = require(`../../Structures/Command`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "bc",
            aliases: ["botclear"],
            category: "moderation",
            description: "Clears messages sent by bots.",
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

        let noPermissionsEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> You can not use this command!`,
            title: ':x: Insufficient Permissions! :x:'
        });

        if (!message.member.roles.cache.some(rl => this.permissions.includes(rl.id))) return message.reply({
            embeds: [noPermissionsEmbed]
        });



    }

}