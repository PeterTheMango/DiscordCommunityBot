const {
    Message,
    MessageEmbed
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const ChatHandler = require(`../../Handlers/ChatHandler`);
const format = require(`humanize-duration`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "chat",
            aliases: [],
            category: "Activity",
            description: "Shows how much time you spend on text channels weekly.",
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
            title: "Message Activity",
            description: `${message.member} <:vcbut:964501179247759400> You have sent **msgs** this week in [chats](https://discord.gg/c88dUg5bDk)`
        });

        let wChat = await ChatHandler.getWeeklyUserData(message.member);

        if (!wChat) {
            return message.channel.send({
                embeds: [embed.setDescription(`**NO DATA!** Start chatting in one of the [chatting channels](https://discord.gg/c88dUg5bDk) to register data.`)]
            });
        }

        await message.channel.send({
            embeds: [embed.setDescription(embed.description.replace(`msgs`, format(wChat.messages)))]
        })

    }

}