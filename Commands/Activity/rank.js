const {
    Message
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const {
    getUserLevel,
    getNeededXP
} = require(`../../Handlers/LevelHandler`);
const format = require(`humanize-duration`);
const {
    MessageEmbed
} = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "rank",
            aliases: [],
            category: "Activity",
            description: "Shows the users current rank info.",
            usage: ""
        })
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {


        
        let noUserEmbed = new MessageEmbed({
            color: `RED`,
            title: `Missing User!`,
            description: `I was not able to find that user!`
        });
        
       	let user = message.member;
        
        if(args.length < 1) user = message.member;
        else user = message.mentions.members.first();
        
        if(!user) return message.channel.send({embeds: [noUserEmbed]});
	
        let rankEmbed = new MessageEmbed({
            color: "#F8C8DC",
            author: {
                name: `${user.user.tag}`,
                iconURL: user.displayAvatarURL({
                    dynamic: true
                })
            },
            thumbnail: {
                url: "https://i.imgur.com/KTn23ws.png"
            },
            title: "Voice Stats",
            description: [
                "<:starcute:935436931670618152> **Level:** {level}",
                "<:starcute:935436931670618152> **Points:** {xp}",
                "",
                "<:XP:935439482696630272> **{xp}/{neededxp}** XP needed to level up"
            ].join("\n"),
            image: {
                url: `https://media.discordapp.net/attachments/859883140423614474/859883158493593600/dividerrr.gif`
            },
            footer: {
                iconURL: "https://i.imgur.com/MSoBT8L.png",
                text: "You spent {time} in voice-chat!"
            }
        });
        
        let levelData = await getUserLevel(user);

        if (!levelData) {
            return message.channel.send({
                embeds: [rankEmbed.setDescription(`${message.member} <a:egp_no:935209428070854717> No Data Available!`)]
            });
        }

        await message.channel.send({
            embeds: [rankEmbed.setDescription(rankEmbed.description
                .replace("{level}", levelData.level)
                .replace("{xp}", levelData.xp)
                .replace("{xp}", levelData.xp)
                .replace("{neededxp}", await getNeededXP(levelData.level))
            ).setFooter({
                iconURL: rankEmbed.footer.iconURL,
                text: rankEmbed.footer.text.replace(`{time}`, await format(levelData.time))
            })]
        })

    }

}