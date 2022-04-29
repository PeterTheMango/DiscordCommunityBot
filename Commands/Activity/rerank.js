const {
    Message
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const {
    giveLevelRank
} = require(`../../Handlers/LevelHandler`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "",
            aliases: [],
            category: "",
            description: "",
            usage: ""
        })
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {

        await giveLevelRank(message.member);

    }

}