const {
    Message
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const {
    createAllTimeLeaderboard
} = require(`../../Handlers/LevelHandler`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "alltimexplb",
            aliases: ["atxplb"],
            category: "Leaderboard",
            description: "Creates a new All Time xp leaderabord.",
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