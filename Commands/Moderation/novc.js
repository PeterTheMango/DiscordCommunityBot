/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-vars */
const {
    Message,
    MessageEmbed
} = require('discord.js');
const {
    noVcUser
} = require('../../Handlers/ModerationHandler');
const {
    vcMod
} = require(`../../Assets/Config.json`);
const Cooldowns = require(`../../Models/Cooldown`);
const Command = require(`../../Structures/Command`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'novc',
            aliases: [],
            category: 'Moderation',
            description: 'Voice bans a user.',
            usage: '<user> <reason>'
        });
    }

    /**
     *
     * @param {Message} message
     * @param {string[]} args
     */
    async execute(message, args) {

        let noPermissionsEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> You can not use this command!`,
            title: ':x: Insufficient Permissions! :x:'
        });
        let missingArgsEmbed = new MessageEmbed({
            title: "Invalid Usage",
            description: `${message.member} <a:egp_no:935209428070854717> .novc \`user\` \`reason\``,
            color: "RED"
        });
        let userAlreadyBannedEmbed = new MessageEmbed({
            title: "Invalid Usage",
            description: `${message.member} <a:egp_no:935209428070854717> This user is already voice-banned.`,
            color: "RED"
        });
        let invalidUserEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> That user is not in this server!`,
            title: ':x: USER NOT FOUND :x:'
        });
        let noReasonEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> Please provide a reason for the no-vc punishment!`,
            title: 'No Reason Provided'
        });
        let userBannedEmbed = new MessageEmbed({
            color: 'GREEN',
            description: `{user} <a:ticktick:935208907037610034> has been no-vced for **{reason}**!`,
        });
        let immuneUserEmbed = new MessageEmbed({
            color: 'RED',
            description: `${message.member} <a:egp_no:935209428070854717> That user is cannot be voice-banned!`,
            title: 'User Immune'
        });

        if (!message.member.roles.cache.has(vcMod)) return message.channel.send({
            embeds: [noPermissionsEmbed]
        });

        if (args.length < 2) return message.channel.send({
            embeds: [missingArgsEmbed]
        });

        let user = message.mentions.members.first();
        if (message.mentions.members.size === 1) {
            user = await message.mentions.members.first();
            args.shift();
        } else {
            user = await message.guild.members.fetch(args.shift()).catch(err => user = null);
        }

        if (!user) return message.channel.send({
            embeds: [invalidUserEmbed]
        });

        let reason = args.join(' ');

        if (reason === '') return message.channel.send({
            embeds: [noReasonEmbed]
        });

        let isBanned = await Cooldowns.findOne({
            discord_id: user.id,
            type: `novc`
        });

        if (isBanned) return message.channel.send({
            embeds: [userAlreadyBannedEmbed]
        });

        let userVoiceBanned = await noVcUser(user, message.member, reason);
        if (message.member.voice.channel) {
            await message.member.voice.disconnect();
        }

        if (!userVoiceBanned) return message.channel.send({
            embeds: [immuneUserEmbed]
        });

        await message.channel.send({
            embeds: [userBannedEmbed.setDescription(userBannedEmbed.description.replace(`{user}`, `${user}`).replace(`{reason}`, reason))]
        });

    }

};