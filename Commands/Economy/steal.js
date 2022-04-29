const {
    Message,
    MessageEmbed
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const {
    getBalance,
    updateBalance
} = require(`../../Handlers/EconomyHandler`);
const Cooldown = require(`../../Structures/Cooldown`);
const CooldownManager = require(`../../Models/Cooldown`);
const format = require(`humanize-duration`);
const Emotes = require(`../../Handlers/EmoteHandler`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "steal",
            aliases: ["rob"],
            category: "Economy",
            description: "Attempts to rob from a members wallet.",
            usage: "<member>"
        })
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {

        const noUserEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> That user is not in this server!`,
            title: ':x: USER NOT FOUND :x:'
        });

        const noArgsEmbed = new MessageEmbed({
            description: `${message.member} <:egp_info:884216504336416829> Command usage: \`.steal user!\``,
            color: `RED`
        });

        const immuneEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> You cannot rob users with less than 100 coins!`
        });

        const stolenEmbed = new MessageEmbed({
            color: 'GREEN',
            description: `${message.member} <a:tickticktick:935198882172903434> You successfully stole **{amount}** credits from {user}`
        });

        const failedEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> You got caught stealing from {user}! You paid a fee of **{fee}** credits.`
        });

        const cooldownEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> Please send **{msg}** msgs or wait **{time}** to use steal again.`,
            footer: {
                iconURL: Emotes.BELL,
                text: `You can only steal after every 200 messages sent or 15 minutes`
            }
        });

        if (args.length < 1) return message.channel.send({
            embeds: [noArgsEmbed]
        });

        let user = await message.mentions.members.first();

        if (!user) return message.channel.send({
            embeds: [noUserEmbed]
        });

        let hasCooldown = await CooldownManager.findOne({
            discord_id: message.member.id,
            type: "Rob"
        });

        if (hasCooldown) {
            let hasCooldown2 = await CooldownManager.findOne({
                discord_id: message.member.id,
                type: "RobMsg"
            });
            console.log(hasCooldown2)
            return message.channel.send({
                embeds: [
                    cooldownEmbed.setDescription(
                        cooldownEmbed.description
                        .replace(`{time}`, format(hasCooldown.end - Date.now(), {
                            round: true
                        }))
                        .replace(`{msg}`, `hasCooldown2.end`)
                    )
                ]
            });
        }

        let currentBalance = await getBalance(message.member.id);
        let targetBalance = await getBalance(user.id);

        if (targetBalance.wallet < 100) return message.channel.send({
            embeds: [immuneEmbed]
        });

        let chance = await this.generatePercentage(1, 100);

        let win = false;

        if (chance >= 50) {

            win = true;

        } else if (chance < 50) {
            win = false;
        }

        if (win) {

            let totalReturn = Math.round((await this.generatePercentage(10, 75) / 100) * targetBalance.wallet);

            await updateBalance(message.member.id, currentBalance.wallet + totalReturn, currentBalance.stored);
            await updateBalance(user.id, targetBalance.wallet - totalReturn, targetBalance.stored)

            await message.channel.send({
                embeds: [stolenEmbed.setDescription(stolenEmbed.description
                    .replace(`{user}`, `${user}`)
                    .replace(`{amount}`, totalReturn)
                )]
            });
        } else {

            let totalLoss = Math.round((await this.generatePercentage(10, 15) / 100) * currentBalance.wallet);

            await updateBalance(message.member.id, currentBalance.wallet - totalLoss, currentBalance.stored);

            await message.channel.send({
                embeds: [failedEmbed.setDescription(failedEmbed.description
                    .replace(`{user}`, `${user}`)
                    .replace(`{fee}`, `${totalLoss}`)
                )]
            });
        }

        let cooldown = new Cooldown(message.member.id, "Rob", Date.now() + 900000);
        await cooldown.save();
        let cooldown2 = new Cooldown(message.member.id, "RobMsg", 200);
        await cooldown2.save();

    }

    async generatePercentage(x, y) {
        let min = Math.ceil(x);
        let max = Math.floor(y);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}