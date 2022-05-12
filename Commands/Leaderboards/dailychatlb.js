const {
    Message
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const {
    createDailyLeaderboard
} = require(`../../Handlers/ChatHandler`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "dailychatlb",
            aliases: ["dclb"],
            category: "Leaderboard",
            description: "Creates a new daily chat leaderabord.",
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

        await createDailyLeaderboard(message.channel);

    }

}