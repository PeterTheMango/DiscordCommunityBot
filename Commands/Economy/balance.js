/* eslint-disable valid-jsdoc */
/* eslint-disable handle-callback-err */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const {
	Message,
	MessageEmbed
} = require('discord.js');
const Command = require(`../../Structures/Command`);
const {
	getBalance
} = require(`../../Handlers/EconomyHandler`);


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'balance',
			aliases: ['bal'],
			category: 'Economy',
			description: 'Displays your balance or the provided user.',
			usage: '[user]'
		});
	}

	/**
     *
     * @param {Message} message
     * @param {string[]} args
     */
	async execute(message, args) {
		const balanceEmbed = new MessageEmbed({
			color: 'RANDOM',
			description: `{user} <:creditsegp:935442265814491156> You have **{wallet}** credits in your wallet and **{stored}** credits stored!`
		});
		const noUserEmbed = new MessageEmbed({
			color: 'RED',
			description: `${message.member} <a:egp_no:935209428070854717> That user is not in this server!`,
			title: ':x: USER NOT FOUND :x:'
		});

		let user;

		if (args.length <= 0) {
			user = message.member;
		} else {
			user = message.mentions.members.first() || await message.guild.members.fetch(args.shift()).catch(err => user = null);
		}

		if (!user) {
			return message.channel.send({
				embeds: [noUserEmbed]
			});
		}

		const userBalance = await getBalance(user.id);

		message.channel.send({
			embeds: [balanceEmbed.setDescription(balanceEmbed.description
				.replace(`{user}`, `${user}`)
				.replace(`{wallet}`, `${userBalance.wallet}`)
				.replace(`{stored}`, `${userBalance.stored}`)
			)]
		});
	}

};
