const {
    Message,
    MessageEmbed
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const weeklyXP = require(`../../Handlers/LevelHandler`);
const format = require(`humanize-duration`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "vc",
            aliases: [],
            category: "Activity",
            description: "Shows how much time you spend on voice channels weekly.",
            usage: ""
        })
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {

        let embed = new MessageEmbed({
            color: "#ff00c8",
            title: "Voice Channel Activity",
            description: `${message.member} You have spent time this week in VCs!`
        });

        let wXP = await weeklyXP.getWeeklyXP(message.member);

        if (!wXP) {
            return message.channel.send({
                embed: [embed.setDescription(`NO DATA FOUND`)]
            });
        }

        await message.channel.send({
            embeds: [embed.setDescription(embed.description.replace(`time`, format(wXP.time)))]
        });

    }

}