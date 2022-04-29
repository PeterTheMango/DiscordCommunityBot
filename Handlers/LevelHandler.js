const {
    Collection,
    Guild,
    TextChannel,
    Role
} = require("discord.js");

const Level = require(`../Models/Level`);
const DailyXP = require(`../Models/DailyXP`);
const WeeklyXP = require(`../Models/WeeklyXP`);
const Leaderboard = require(`../Models/Leaderboard`);

const DailyXpLeaderboard = require(`./Classes/DailyXpLeaderboard`);
const WeeklyXpLeaderboard = require(`./Classes/WeeklyXpLeaderboard`);
const AllTimeXpLeaderboard = require(`./Classes/AllTimeXpLeaderboard`);
const AllTimeLevelLeaderboard = require(`./Classes/LevelLeaderboard`)

const Cooldown = require("../Models/Cooldown");
const CooldownHandler = require(`./CooldownHandler`);
const {
    GuildMember
} = require("discord.js");

const dailyLbCollection = new Collection();
const weeklyLbCollection = new Collection();

/**
 * 
 * @returns {Array} A array of the daily leaders and their stats.
 */
async function getDailyLeaders() {
    let results = await DailyXP.find({}).sort({
        xp: -1
    }).limit(10).lean();
    return results;
}

/**
 * 
 * @returns {Array} A array of the weekly leaders and their stats.
 */
async function getWeeklyLeaders() {
    let results = await WeeklyXP.find({}).sort({
        xp: -1
    }).limit(10).lean();
    return results;
}

/**
 * 
 * @returns {Array} A array of the All Time leaders and their stats.
 */
async function getLeaders() {
    let results = await Level.find({}).sort({
        xp: -1
    }).limit(10).lean();
    return results;
}

/**
 * 
 * @returns {Array} A array of the Level leaders and their stats.
 */
async function getLevelLeaders() {
    let results = await Level.find({}).sort({
        level: -1
    }).limit(10).lean();
    return results;
}

/**
 * @param {GuildMember} member
 * @returns {String[]} All the level data regarding a user.
 */
async function getUserLevel(member) {
    let results = await Level.findOne({
        discord_id: member.id
    });

    if (!results) {
        results = null;
    }

    return results;
}

/**
 * @param {GuildMember} member
 * @returns {String[]} All the level data regarding a user.
 */
async function getWeeklyXP(member) {
    let results = await WeeklyXP.findOne({
        discord_id: member.id
    });

    if (!results) {
        results = null;
    }

    return results;
}

/**
 * 
 * @param {GuildMember} member 
 * @returns {Role[]} Array of all the roles added to the user.
 */
async function giveLevelRank(member) {

    let results = [];
    let roles = [];

    let userLevel = await getUserLevel(member);

    if (userLevel.level >= 80) {
        roles = [
            '792418314998644736',
            '792418274318090261',
            '787042368552566806',
            '787042365054386188',
            '787042360478531624',
            '787042315151736863',
            '787042047445172255',
            '787042045130309662',
            '787042044496576572',
            '787034688107577415',
            '787033430721691648',
            '787041644070305824',
            '787041642459955241',
            '787041638723092481',
            '787041633584676934',
            '787034942336663603',
            '787033174173024306'
        ];
    } else if (userLevel.level >= 75) {
        roles = [
            '792418274318090261',
            '787042368552566806',
            '787042365054386188',
            '787042360478531624',
            '787042315151736863',
            '787042047445172255',
            '787042045130309662',
            '787042044496576572',
            '787034688107577415',
            '787033430721691648',
            '787041644070305824',
            '787041642459955241',
            '787041638723092481',
            '787041633584676934',
            '787034942336663603',
            '787033174173024306'
        ];
    } else if (userLevel.level >= 70) {
        roles = [
            '787042368552566806',
            '787042365054386188',
            '787042360478531624',
            '787042315151736863',
            '787042047445172255',
            '787042045130309662',
            '787042044496576572',
            '787034688107577415',
            '787033430721691648',
            '787041644070305824',
            '787041642459955241',
            '787041638723092481',
            '787041633584676934',
            '787034942336663603',
            '787033174173024306'
        ];
    } else if (userLevel.level >= 65) {
        roles = [
            '787042365054386188',
            '787042360478531624',
            '787042315151736863',
            '787042047445172255',
            '787042045130309662',
            '787042044496576572',
            '787034688107577415',
            '787033430721691648',
            '787041644070305824',
            '787041642459955241',
            '787041638723092481',
            '787041633584676934',
            '787034942336663603',
            '787033174173024306'
        ];
    } else if (userLevel.level >= 60) {
        roles = [
            '787042360478531624',
            '787042315151736863',
            '787042047445172255',
            '787042045130309662',
            '787042044496576572',
            '787034688107577415',
            '787033430721691648',
            '787041644070305824',
            '787041642459955241',
            '787041638723092481',
            '787041633584676934',
            '787034942336663603',
            '787033174173024306'
        ];
    } else if (userLevel.level >= 55) {
        roles = [
            '787042315151736863',
            '787042047445172255',
            '787042045130309662',
            '787042044496576572',
            '787034688107577415',
            '787033430721691648',
            '787041644070305824',
            '787041642459955241',
            '787041638723092481',
            '787041633584676934',
            '787034942336663603',
            '787033174173024306'
        ];
    } else if (userLevel.level >= 50) {
        roles = [
            '787042047445172255',
            '787042045130309662',
            '787042044496576572',
            '787034688107577415',
            '787033430721691648',
            '787041644070305824',
            '787041642459955241',
            '787041638723092481',
            '787041633584676934',
            '787034942336663603',
            '787033174173024306'
        ];
    } else if (userLevel.level >= 45) {
        roles = [
            '787042045130309662',
            '787042044496576572',
            '787034688107577415',
            '787033430721691648',
            '787041644070305824',
            '787041642459955241',
            '787041638723092481',
            '787041633584676934',
            '787034942336663603',
            '787033174173024306'
        ];
    } else if (userLevel.level >= 40) {
        roles = [
            '787042044496576572',
            '787034688107577415',
            '787033430721691648',
            '787041644070305824',
            '787041642459955241',
            '787041638723092481',
            '787041633584676934',
            '787034942336663603',
            '787033174173024306'
        ];
    } else if (userLevel.level >= 35) {
        roles = [
            '787034688107577415',
            '787033430721691648',
            '787041644070305824',
            '787041642459955241',
            '787041638723092481',
            '787041633584676934',
            '787034942336663603',
            '787033174173024306'
        ];
    } else if (userLevel.level >= 30) {
        roles = [
            '787033430721691648',
            '787041644070305824',
            '787041642459955241',
            '787041638723092481',
            '787041633584676934',
            '787034942336663603',
            '787033174173024306'
        ];
    } else if (userLevel.level >= 25) {
        roles = [
            '787041644070305824',
            '787041642459955241',
            '787041638723092481',
            '787041633584676934',
            '787034942336663603',
            '787033174173024306'
        ];
    } else if (userLevel.level >= 20) {
        roles = [
            '787041642459955241',
            '787041638723092481',
            '787041633584676934',
            '787034942336663603',
            '787033174173024306'
        ];
    } else if (userLevel.level >= 15) {
        roles = [
            '787041638723092481',
            '787041633584676934',
            '787034942336663603',
            '787033174173024306'
        ];
    } else if (userLevel.level >= 10) {
        roles = [
            '787041633584676934',
            '787034942336663603',
            '787033174173024306'
        ];
    } else if (userLevel.level >= 5) {
        roles = [
            '787034942336663603',
            '787033174173024306'
        ];
    } else if (userLevel.level >= 1) {
        roles = [
            '787033174173024306'
        ];
    } else {
        roles = [];
    }

    try {
        await member.roles.add(roles);
    } catch (err) {
        console.log(err);
    }



}

/**
 * 
 * @param {Number} level 
 * @returns {Number} The amount of xp needed to level up.
 */
async function getNeededXP(level) {
    let needed = 0;
    if (level >= 21) {
        needed = 3000;
    } else if (level >= 10) {
        needed = 1000;
    } else {
        needed = 110;
    }
    return needed;
}

/**
 * 
 * @param {TextChannel} channel 
 */
async function createDailyLeaderboard(channel) {

    let leaderboard = new DailyXpLeaderboard(channel.guild, channel, getDailyLeaders(), null);
    await leaderboard.send();
    await leaderboard.save();
    dailyLbCollection.set(leaderboard.message.id, leaderboard);

}

/**
 * 
 * @param {TextChannel} channel 
 */
async function createWeeklyLeaderboard(channel) {

    let leaderboard = new WeeklyXpLeaderboard(channel.guild, channel, getWeeklyLeaders(), null);
    await leaderboard.send();
    await leaderboard.save();
    weeklyLbCollection.set(leaderboard.message.id, leaderboard);

}

/**
 * 
 * @param {TextChannel} channel 
 */
async function createAllTimeLeaderboard(channel) {

    let leaderboard = new AllTimeXpLeaderboard(channel.guild, channel, getLeaders(), null);
    await leaderboard.send();
    await leaderboard.save();

}

/**
 * 
 * @param {TextChannel} channel 
 */
async function createAllTimeLevelLeaderboard(channel) {

    let leaderboard = new AllTimeLevelLeaderboard(channel.guild, channel, getLevelLeaders(), null);
    await leaderboard.send();
    await leaderboard.save();

}

/**
 * Reinitializes all sent leaderboards.
 * @param {Guild} guild 
 */
async function startLeaderboards(guild) {

    let leaderboards = await Leaderboard.find({});

    await leaderboards.forEach(async record => {

        let lbChannel = await guild.channels.fetch(record.channel_id).catch(err => console.log(`Unable to find channel with the ID of ${record.channel_id}!`));

        if (!lbChannel) {
            await Cooldown.findOneAndDelete({
                discord_id: record.message_id
            }).catch(err => console.log(`Unable to delete Leaderboard Cooldown for ${record.message_id}. Error: \n\n${err.toString()}`));
            return Leaderboard.findOneAndDelete({
                channel_id: record.channel_id,
                type: record.type
            }).catch(err => console.log(`Unable to delete leaderboard CH: ${record.channel_id}! Error:\n${err.toString()}`));
        }

        if (!["GUILD_TEXT", "GUILD_NEWS"].includes(lbChannel.type)) {
            await Cooldown.findOneAndDelete({
                discord_id: record.message_id
            }).catch(err => console.log(`Unable to delete Leaderboard Cooldown for ${record.message_id}. Error: \n\n${err.toString()}`));
            return Leaderboard.findOneAndDelete({
                channel_id: record.channel_id,
                type: record.type
            }).catch(err => console.log(`Unable to delete leaderboard CH: ${record.channel_id}! Error:\n${err.toString()}`));
        }

        let lbMessage = await lbChannel.messages.fetch(record.message_id).catch(err => {
            console.log(`Unable to find message with the id of ${record.discord_id}`)
            lb_msg = null
        });
        if (!lbMessage) {
            await Cooldown.findOneAndDelete({
                discord_id: record.message_id
            }).catch(err => console.log(`Unable to delete Leaderboard Cooldown for ${record.message_id}. Error: \n\n${err.toString()}`));
            return Leaderboard.findOneAndDelete({
                channel_id: record.channel_id,
                type: record.type
            }).catch(err => console.log(`Unable to delete leaderboard CH: ${record.channel_id}! Error:\n${err.toString()}`));
        }

        let leaderboard;
        if (record.type === "Daily_XP") {
            leaderboard = new DailyXpLeaderboard(guild, lbChannel, getDailyLeaders(), lbMessage);
            await dailyLbCollection.set(lbMessage.id, leaderboard);
        } else if (record.type === "Weekly_XP") {
            leaderboard = new WeeklyXpLeaderboard(guild, lbChannel, getWeeklyLeaders(), lbMessage);
            await weeklyLbCollection.set(lbMessage.id, leaderboard);
        } else if (record.type === "AllTime_XP") {
            leaderboard = new AllTimeXpLeaderboard(guild, lbChannel, getLeaders(), lbMessage)
        } else if (record.type === "AllTime_Level") {
            leaderboard = new AllTimeLevelLeaderboard(guild, lbChannel, getLevelLeaders(), lbMessage)
        }

        await leaderboard.update();

        setInterval(() => {
            leaderboard.update()
        }, 300000);

    });

    await setTimeout(async () => {
        await CooldownHandler.registerDailyCooldowns(dailyLbCollection);
        await CooldownHandler.registerWeeklyCooldowns(weeklyLbCollection);
    }, 1000)

}

module.exports = {
    startLeaderboards,
    getDailyLeaders,
    getWeeklyLeaders,
    getLeaders,
    getLevelLeaders,
    getUserLevel,
    getWeeklyXP,
    getNeededXP,
    dailyLbCollection,
    weeklyLbCollection,
    createDailyLeaderboard,
    createWeeklyLeaderboard,
    createAllTimeLeaderboard,
    createAllTimeLevelLeaderboard,
    giveLevelRank
}