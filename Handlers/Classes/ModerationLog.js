const {
    MessageEmbed,
    GuildMember,
    Guild
} = require(`discord.js`);
const {
    channels
} = require(`../../Assets/Config.json`);
const Emotes = require(`../EmoteHandler`);

class UserBanLog {

    /**
     * 
     * @param {GuildMember} user 
     * @param {GuildMember} moderator 
     * @param {String} reason 
     * @param {Number} offenses 
     * @param {Guild} guild 
     */
    constructor(user, moderator, reason, offenses, guild) {
        this.user = user;
        this.moderator = moderator;
        this.reason = reason;
        this.guild = guild;
        this.offenses = offenses;
    }

    /**
     * @returns True when log was successfully sent and false if not.
     */
    async sendLog() {
        let logEmbed = new MessageEmbed({
            color: "#FDDDFE",
            title: "USER BANNED",
            description: `User Banned: <@${this.user.id}>\nBanned By: <@${this.moderator.id}>\nReason: **${this.reason}**\nOffense: **${this.offenses}**`,
            footer: {
                text: "Moderation Logs",
                iconURL: Emotes.MODERATION_LOG
            },
            timestamp: Date.now()
        });
        await logEmbed.setThumbnail(`https://i.imgur.com/N54bXcV.png`)

        let logsChannel = this.guild.channels.cache.get(channels.bot_logs);

        if (!logsChannel) return false
        else {
            logsChannel.send({
                embeds: [logEmbed]
            });
            return true;
        }

    }

    /**
     * @returns True if the user notification was sent and false if not.
     */
    async sendUserLog() {

        let userEmbed = new MessageEmbed({
            color: "#FF71B1",
            author: {
                name: "E-Girl Paradise",
                iconURL: "https://cdn.discordapp.com/icons/727649662475173962/a_b0e71799d16f310bfde4182ee2ae96e6.gif"
            },
            title: "Ban :warning:",
            description: `You have been banned from **E-Girl Paradise** for **${this.reason}**\n\n[Appeal Here](https://discord.com/7QJzm2XmaD)`,
            timestamp: Date.now()
        });
        await userEmbed.setThumbnail(`https://i.imgur.com/Xtv4Wcs.png`);

        try {
            await this.user.send({
                embeds: [userEmbed]
            });
            return true;
        } catch (err) {
            console.log(`Unable to send message to ${this.user.user.username}. Reason: Locked DMs!`);
            return false;
        }


    }

}

module.exports.userBanLog = UserBanLog