const {
    Message
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const {
    createWeeklyLeaderboard
} = require(`../../Handlers/ChatHandler`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "weeklychatlb",
            aliases: ["wclb"],
            category: "Leaderboard",
            description: "Creates a new weekly chat leaderabord.",
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

        await createWeeklyLeaderboard(message.channel);

    }

}