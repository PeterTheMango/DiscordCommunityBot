const {
    Message
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const {
    createAllTimeLeaderboard
} = require(`../../Handlers/ChatHandler`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "alltimechatlb",
            aliases: ["atclb"],
            category: "Leaderboard",
            description: "Creates a new All Time Chat leaderabord.",
            usage: ""
        })
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {

        await message.delete();

        if (!message.member.permissions.has(`ADMINISTRATOR`)) return;

        await createAllTimeLeaderboard(message.channel);

    }

}