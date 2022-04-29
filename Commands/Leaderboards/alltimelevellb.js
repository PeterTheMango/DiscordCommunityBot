const {
    Message
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const {
    createAllTimeLevelLeaderboard
} = require(`../../Handlers/LevelHandler`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "alltimelvllb",
            aliases: ["atlvllb"],
            category: "Leaderboard",
            description: "Creates a new All Time Level leaderabord.",
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

        await createAllTimeLevelLeaderboard(message.channel);

    }

}