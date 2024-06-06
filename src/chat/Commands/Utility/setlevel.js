const {
    Message
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const Level = require(`../../Models/Level`);
const {getUserLevel} = require(`../../Handlers/LevelHandler`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "setlevel",
            aliases: [],
            category: "Utilities",
            description: "Gives a membera new voice level.",
            usage: "<user>"
        })
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {

        if (!message.member.permissions.has(`ADMINISTRATOR`)) return;

        if (args.length < 2) return message.reply(`Please provide a user and a level <a:loveheart:811665342023073882>`);

        let user = message.mentions.members.first();

        if (!user) return message.reply(`That user does not exist!`);
        
        await args.shift();
        
        let level = parseInt(args.shift());
        
        if(isNaN(level) || level < 1) return message.reply(`Please provide a valid number level.`);
		
        await getUserLevel(user);
        	
		let userLevel = await Level.findOneAndUpdate({discord_id: user.id}, {$set: {level: level}});
        
        await message.react(`✅`);

    }

}