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

class NoVCLog {

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
            title: "USER VOICE BANNED",
            description: `User Banned: <@${this.user.id}>\nBanned By: <@${this.moderator.id}>\nReason: **${this.reason}**\nOffense: **${this.offenses}**`,
            footer: {
                text: "Moderation Logs",
                iconURL: Emotes.MODERATION_LOG
            },
            timestamp: Date.now()
        });
        await logEmbed.setThumbnail(`https://i.imgur.com/9wzOzCt.png`)

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
            color: "#CAD6FE",
            title: "Voice Banned",
            footer: {
                iconURL: "https://cdn.discordapp.com/emojis/935418232431583272.webp",
                text: "Duration: 30 minutes"
            },
            description: `<:moderation:935246558478364722> You were voice-banned by ${this.moderator} for **${this.reason}** for **30 Minutes** in **E-Girl Paradise**\n\n[Support Server](https://discord.gg/3SuFWBEeqz)`,
            timestamp: Date.now()
        });

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

    /**
     * @returns True if the user notification was sent and false if not.
     */
    async sendUserComplete() {

        let userEmbed = new MessageEmbed({
            color: "#CAD6FE",
            title: "Ban Expired",
            footer: {
                iconURL: "https://cdn.discordapp.com/emojis/935419755093962782.webp",
                text: "Please follow our rules to avoid further punishment"
            },
            description: `<a:ticktick:935208907037610034> Your voice-ban has expired!`,
            timestamp: Date.now()
        });

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

class muteLog {

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
            title: "USER MUTED",
            description: `User Muted: <@${this.user.id}>\nMuted By: <@${this.moderator.id}>\nReason: **${this.reason}**\nOffense: **${this.offenses}**`,
            footer: {
                text: "Moderation Logs",
                iconURL: Emotes.MODERATION_LOG
            },
            timestamp: Date.now()
        });
        await logEmbed.setThumbnail(`https://i.imgur.com/HGx9cua.png`)

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
            color: "#CAD6FE",
            title: "Muted",
            footer: {
                iconURL: "https://cdn.discordapp.com/emojis/935418232431583272.webp",
                text: "Duration: 5 minutes"
            },
            description: `<:moderation:935246558478364722> You were muted by ${this.moderator} for **${this.reason}** for **5 Minutes** in **E-Girl Paradise**\n\n[Support Server](https://discord.gg/3SuFWBEeqz)`,
            timestamp: Date.now()
        });

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

    /**
     * @returns True if the user notification was sent and false if not.
     */
    async sendUserComplete() {

        let userEmbed = new MessageEmbed({
            color: "#CAD6FE",
            title: "Mute Expired",
            footer: {
                iconURL: "https://cdn.discordapp.com/emojis/935419755093962782.webp",
                text: "Please follow our rules to avoid further punishment"
            },
            description: `<a:ticktick:935208907037610034> Your mute has expired!`,
            timestamp: Date.now()
        });

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
module.exports.userVoiceBanLog = NoVCLog
module.exports.userMuteLog = muteLog