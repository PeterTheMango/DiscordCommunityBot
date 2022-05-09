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
            description: `${message.member} <:vcbut:964501179247759400> You have spent **time** this week in [VCs](https://discord.gg/c88dUg5bDk)`
        });

        let wXP = await weeklyXP.getWeeklyXP(message.member);

        if (!wXP) {
            return message.channel.send({
                embeds: [embed.setDescription(`**NO DATA!** Join a [VC](https://discord.gg/c88dUg5bDk) to register a data.`)]
            });
        }

        await message.channel.send({
            embeds: [embed.setDescription(embed.description.replace(`time`, format(wXP.time)))]
        })

    }

}