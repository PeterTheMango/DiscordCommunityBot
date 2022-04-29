/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const {
	Message,
	MessageEmbed
} = require('discord.js');
const Command = require(`../../Structures/Command`);
const cooldownInstance = require(`../../Models/Cooldown`);
const Cooldown = require(`../../Structures/Cooldown`);
const {
	getBalance,
	updateBalance
} = require(`../../Handlers/EconomyHandler`);
const Config = require(`../../Assets/Config.json`);
const Emotes = require(`../../Handlers/EmoteHandler`);
const formatTime = require(`humanize-duration`);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'work',
			aliases: [],
			category: 'Economy',
			description: 'Allows your user to gain credits by working.',
			usage: ''
		});
	}

	/**
     *
     * @param {Message} message
     * @param {string[]} args
     */
	async execute(message, args) {
		// Embeds
		const cooldownEmbed = new MessageEmbed({
			description: `${message.member} <a:egp_no:935209428070854717> Please wait %time_left% to try again!`,
			footer: {
				text: `You can only use .work every 15 minutes`,
				iconURL: Emotes.BELL
			},
			color: `RED`
		});

		const workEmbed = new MessageEmbed({
			description: `${message.member} <a:tickticktick:935198882172903434> You have been awarded with **${Config.economy.work_reward}** credits!`,
			color: 'GREEN'
		});

		const hasCooldown = await cooldownInstance.findOne({
			// eslint-disable-next-line camelcase
			discord_id: message.member.id,
			type: 'Work'
		});

		if (hasCooldown) {
			return message.channel.send({
				embeds: [cooldownEmbed.setDescription(cooldownEmbed.description.replace(`%time_left%`, `**${formatTime(hasCooldown.end - Date.now(), { round: true })}**`))]
			});
		}

		const userBalance = await getBalance(message.member.id);
		await updateBalance(message.member.id, userBalance.wallet + Config.economy.work_reward, userBalance.stored);

		await message.channel.send({
			embeds: [workEmbed]
		});

		const workCooldown = new Cooldown(message.member.id, 'Work', Date.now() + Config.economy.work_cooldown);
		await workCooldown.save();
	}

};
