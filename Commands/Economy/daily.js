const {
    Message,
    MessageEmbed
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const Cooldown_Instance = require(`../../Models/Cooldown`)
const Cooldown = require(`../../Structures/Cooldown`);
const {
    getBalance,
    updateBalance
} = require(`../../Handlers/EconomyHandler`);
const Config = require(`../../Assets/Config.json`);
const Emotes = require(`../../Handlers/EmoteHandler`);
const format_time = require(`humanize-duration`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "daily",
            aliases: [],
            category: "Economy",
            description: "Gives users the daily reward.",
            usage: ""
        })
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {

        // Embeds
        let cooldown_embed = new MessageEmbed({
            description: `${message.member} <a:egp_no:935209428070854717> Please wait %time_left% to try again!`,
            footer: {
                text: `You can only use .daily every 24 hours`,
                iconURL: Emotes.BELL
            },
            color: `RED`
        });

        let daily_embed = new MessageEmbed({
            description: `${message.member} <a:tickticktick:935198882172903434> You have been awarded with **${Config.economy.daily_reward}** credits!`,
            color: "GREEN"
        });

        let hasCooldown = await Cooldown_Instance.findOne({
            discord_id: message.member.id,
            type: "Daily"
        });

        if (hasCooldown) return message.channel.send({
            embeds: [cooldown_embed.setDescription(cooldown_embed.description.replace(`%time_left%`, `**${format_time(hasCooldown.end - Date.now(), {round: true})}**`))]
        });

        let userBalance = await getBalance(message.member.id);
        await updateBalance(message.member.id, userBalance.wallet + Config.economy.daily_reward, userBalance.stored);

        await message.channel.send({
            embeds: [daily_embed]
        });

        let dailyCooldown = new Cooldown(message.member.id, "Daily", Date.now() + Config.economy.daily_cooldown);
        await dailyCooldown.save();


    }

}