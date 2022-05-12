const {
    GuildMember
} = require("discord.js");
const Chat = require(`../Models/Chat`);
const WeeklyChat = require(`../Models/WeeklyChat`);
const DailyChat = require(`../Models/WeeklyChat`);
const AllTimeChatLeaderboard = require(`./Classes/AllTimeChatLeaderboard`);
const WeeklyLeaderboard = require(`./Classes/WeeklyChatLeaderboard`);
const DailyLeaderboard = require(`./Classes/DailyChatLeaderboard`);

async function getAllTimeLeaders() {
    return Chat.find({}).sort({
        messages: -1
    }).limit(10).lean();
};

async function getWeeklyLeaders() {
    return WeeklyChat.find({}).sort({
        messages: -1
    }).limit(10).lean();
};

async function getDailyLeaders() {
    return DailyChat.find({}).sort({
        messages: -1
    }).limit(10).lean();
};

/**
 * 
 * @param {GuildMember} member 
 */
async function getUserData(member) {
    return Chat.findOne({
        discord_id: member.id
    });
};

/**
 * 
 * @param {GuildMember} member 
 */
async function getWeeklyUserData(member) {
    return WeeklyChat.findOne({
        discord_id: member.id
    });
};

/**
 * 
 * @param {TextChannel} channel 
 */
async function createAllTimeLeaderboard(channel) {
    let leaderboard = new AllTimeChatLeaderboard(channel.guild, channel, await getAllTimeLeaders(), null);
    await leaderboard.send();
    await leaderboard.save();
    return leaderboard;
}

/**
 * 
 * @param {TextChannel} channel 
 */
async function createDailyLeaderboard(channel) {
    let leaderboard = new DailyLeaderboard(channel.guild, channel, await getDailyLeaders(), null);
    await leaderboard.send();
    await leaderboard.save();
    return leaderboard;
}

/**
 * 
 * @param {TextChannel} channel 
 */
async function createWeeklyLeaderboard(channel) {
    let leaderboard = new WeeklyLeaderboard(channel.guild, channel, await getWeeklyLeaders(), null);
    await leaderboard.send();
    await leaderboard.save();
    return leaderboard;
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
    getAllTimeLeaders,
    getDailyLeaders,
    getWeeklyLeaders,
    getUserData,
    getWeeklyUserData,
    createAllTimeLeaderboard,
    createDailyLeaderboard,
    createWeeklyLeaderboard
}