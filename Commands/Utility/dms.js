const {
    Message,
    MessageEmbed
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const {
    switchOffNotifications,
    switchOnNotifications
} = require(`../../Handlers/NotificationHandler`);
const Emotes = require(`../../Handlers/EmoteHandler`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "dms",
            aliases: [],
            category: "Utility",
            description: "Switches your notification status.",
            usage: "<on/off>"
        })
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {

        //EMBEDS: noargs, wrongOptions, onNotification, offNotification

        const noArgsEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> You did not provide a option for this command! \n\nAvailable Options: \`on | off\``,
            title: 'No Option Given'
        });

        const wrongOptionsEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> You did not choose a valid option! \n\nAvailable Options: \`on | off\``,
            title: 'Wrong Option Provided'
        });

        const onNotificationEmbed = new MessageEmbed({
            color: "GREEN",
            title: "LEVEL-NOTIFICATIONS ON",
            description: `<a:tickticktick:935198882172903434> Voice level notifications are now **enabled**!\n\n<:infoinfof:953002318259945593> \`.dms off\` to disable level-up notifications again.`,
            image: {
                url: "https://media.discordapp.net/attachments/859883140423614474/859883158493593600/dividerrr.gif"
            },
            thumbnail: {
                url: "https://i.imgur.com/oUhuHGG.png"
            },
            footer: {
                iconURL: Emotes.SPINNING_STAR,
                text: "E-Girl Paradise | level-up notifications"
            }
        });

        const offNotificationEmbed = new MessageEmbed({
            color: "RED",
            title: "LEVEL-NOTIFICATIONS OFF",
            description: `<a:tickticktick:935198882172903434> Voice level notifications are now **disabled**!\n\n<:greeen:953002319014953071> \`.dms on\` to enable level-up notifications again.`,
            image: {
                url: "https://media.discordapp.net/attachments/859883140423614474/859883158493593600/dividerrr.gif"
            },
            thumbnail: {
                url: "https://i.imgur.com/q3eVeJO.png"
            },
            footer: {
                iconURL: Emotes.SPINNING_STAR,
                text: "E-Girl Paradise | level-up notifications"
            }
        });

        let options = ["on", "off"];

        if (args.length < 1) return message.channel.send({
            embeds: [noArgsEmbed]
        });

        let choice = args.shift().toLowerCase();

        if (!options.includes(choice)) return message.channel.send({
            embeds: [wrongOptionsEmbed]
        });;

        if (choice === "on") {
            await message.channel.send({
                embeds: [onNotificationEmbed]
            });
            await switchOnNotifications(message.member);

        } else {
            await message.channel.send({
                embeds: [offNotificationEmbed]
            });
            await switchOffNotifications(message.member);

        }

    }

}