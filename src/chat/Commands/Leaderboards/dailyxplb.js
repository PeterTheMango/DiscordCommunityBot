const {
    Message
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const {
    createDailyLeaderboard
} = require(`../../Handlers/LevelHandler`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "dailyxplb",
            aliases: ["dxplb"],
            category: "Leaderboard",
            description: "Creates a new daily xp leaderabord.",
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