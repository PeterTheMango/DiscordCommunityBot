const {
    GuildMember
} = require("discord.js");
const Chat = require(`../Models/Chat`);
const WeeklyChat = require(`../Models/WeeklyChat`);
const DailyChat = require(`../Models/DailyChat`);
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
    let q = await Chat.findOne({
        discord_id: member.id
    });
    if (!q) {
        q = await Chat.findOneAndUpdate({
            discord_id: member.id
        }, {
            discord_id: member.id,
            messages: 0,
            reward_messages: 0
        }, {
            upsert: true,
            new: true
        });
    }
    return q;
};

/**
 * 
 * @param {GuildMember} member 
 */
async function getWeeklyUserData(member) {
    let q = await WeeklyChat.findOne({
        discord_id: member.id
    });

    if (!q) {
        q = await WeeklyChat.findOneAndUpdate({
            discord_id: member.id
        }, {
            discord_id: member.id,
            messages: 0,
            reward_messages: 0
        }, {
            upsert: true,
            new: true
        });
    }
    return q;
};

/**
 * 
 * @param {GuildMember} member 
 */
async function getDailyUserData(member) {
    let q = await DailyChat.findOne({
        discord_id: member.id
    });
    if (!q) {
        q = await DailyChat.findOneAndUpdate({
            discord_id: member.id
        }, {
            discord_id: member.id,
            messages: 0
        }, {
            upsert: true,
            new: true
        });
    }
    return q;
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
 * 
 * @param {GuildMember} member 
 */
async function addMessage(member) {
    let oldData = await getUserData(member);
    let newData = await Chat.findOneAndUpdate({
        discord_id: member.id
    }, {
        $set: {
            messages: oldData.messages + 1,
            reward_messages: oldData.reward_messages + 1
        }
    }, {
        upsert: true,
        new: true
    });
    let oldWeeklyData = await getWeeklyUserData(member);
    let newWeeklyData = await WeeklyChat.findOneAndUpdate({
        discord_id: member.id
    }, {
        $set: {
            messages: oldWeeklyData.messages + 1,
            reward_messages: oldWeeklyData.reward_messages + 1
        }
    }, {
        upsert: true,
        new: true
    });
    let oldDailyData = await getDailyUserData(member);
    let newDailyData = await DailyChat.findOneAndUpdate({
        discord_id: member.id
    }, {
        $set: {
            messages: oldDailyData.messages + 1
        }
    }, {
        upsert: true,
        new: true
    });
    return {
        newData,
        newWeeklyData,
        newDailyData
    };
}

/**
 * 
 * @param {GuildMember} member 
 */
async function resetWeeklyRewardMessages(member) {

    let userData = await getWeeklyUserData(member);
    let q = await WeeklyChat.findOneAndUpdate({
        discord_id: member.id
    }, {
        discord_id: member.id,
        messages: userData.messages,
        reward_messages: 0
    }, {
        upsert: true,
        new: true
    });

    return q;

}

module.exports = {
    getAllTimeLeaders,
    getDailyLeaders,
    getWeeklyLeaders,
    getUserData,
    getWeeklyUserData,
    getDailyUserData,
    createAllTimeLeaderboard,
    createDailyLeaderboard,
    createWeeklyLeaderboard,
    addMessage,
    resetWeeklyRewardMessages
}