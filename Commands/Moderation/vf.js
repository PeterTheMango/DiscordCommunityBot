const {
    Message
} = require("discord.js");
const Command = require(`../../Structures/Command`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "vf",
            aliases: [],
            category: "Utilities",
            description: "Gives a member vf's role.",
            usage: "<user>",
            permission: ["MANAGE_MESSAGES"]
        })
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {

        if (![`192715014602358784`, `213611159377412096`, `454625485704396800`, `844629947901673472`, `140390673047224320`, `307564094502731776`, `258858220699779072`, `741163383897849918`, `968758780596748318`, `586696239261810739`, `949677813764620318`, `590935683888316466`, `581126291676332032`, `735528817891737732`, `476117438212210690`, `947985041575788606`, `126424609728757770`, `767053410239250462`, `288472265807495168`, `872605900001669121`, `872605900001669121`, `850431546237911061`, `409800550763200512`, ].includes(message.author.id)) return;

        let role = await message.guild.roles.cache.get(`752718731121131590`);

        if (!role) return message.react(`❌`);

        if (args.length < 1) return message.reply(`Please provide a user. Make sure they've followed the steps in <#730459339965464676>`);

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