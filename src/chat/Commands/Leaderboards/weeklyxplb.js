const {
    Message
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const {
    createWeeklyLeaderboard
} = require(`../../Handlers/LevelHandler`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "weeklyxplb",
            aliases: ["wxplb"],
            category: "Leaderboard",
            description: "Creates a new weekly xp leaderabord.",
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