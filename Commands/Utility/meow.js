const {
    Message
} = require("discord.js");
const Command = require(`../../Structures/Command`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "meow",
            aliases: [],
            category: "Utilities",
            description: "Gives a member zena's role.",
            usage: "<user>"
        })
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {

        if (message.member.id !== `654102208866025473`) return;

        let role = await message.guild.roles.cache.get(`761761331875020830`);

        if (!role) return message.react(`❌`);

        if (args.length < 1) return message.reply(`Please provide a user <a:loveheart:811665342023073882>`);

        let user = message.mentions.members.first();

        if (!user) return message.reply(`That user does not exist!`);

        if (user.roles.cache.get(role.id)) {
            await user.roles.remove(role.id).then(message.react(`✅`)).catch(err => {
                console.log(err);
                message.react(`❌`);
            });
        } else {
            await user.roles.add(role.id).then(message.react(`✅`)).catch(err => {
                console.log(err);
                message.react(`❌`);
            });
        }

    }

}