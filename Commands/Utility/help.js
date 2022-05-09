const {
    Message,
    MessageEmbed
} = require("discord.js");
const Command = require(`../../Structures/Command`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "help",
            aliases: [],
            category: "Utilities",
            description: "Shows a help menu.",
            usage: ""
        })
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {

        let helpEmbed = new MessageEmbed({
            color: "#F7B7FD",
            author: {
                name: `E-Girl Paradise`,
                iconURL: `https://cdn.discordapp.com/icons/727649662475173962/a_b0e71799d16f310bfde4182ee2ae96e6.gif`
            },
            title: `Help Commands`,
            thumbnail: {
                url: `https://cdn.discordapp.com/icons/727649662475173962/a_b0e71799d16f310bfde4182ee2ae96e6.gif`
            },
            footer: {
                iconURL: `https://i.imgur.com/z3WIjfz.png`,
                text: `These are the commands that can be used by members.`
            },
            fields: [{
                    name: `💰 Economy 💰`,
                    value: ".bet .bal .work .daily .steal .pick .give .slots .store .take .claim",
                    inline: true
                },
                {
                    name: `💬 Activity 💬`,
                    value: ".chat .vc .rank .dms on .dms off",
                    inline: true
                },
                {
                    name: `🌟 Fun 🌟`,
                    value: ".hug .kiss .love .hate .slap .bark .spit .simp .uwu",
                    inline: true
                },
                {
                    name: `👥 Gangs [WIP]`,
                    value: `.create .info .promote .demote .disband .kick .leave`,
                    inline: true
                }
            ]
        });

        await message.channel.send({
            embeds: [helpEmbed]
        })

    }

}