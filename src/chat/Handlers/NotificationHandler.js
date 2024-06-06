const {
    GuildMember
} = require("discord.js");
const Notification = require(`../Models/Notifications`);

/**
 * 
 * @param {GuildMember} member 
 */
async function switchOnNotifications(member) {

    let query = await Notification.findOneAndUpdate({
        discord_id: member.id
    }, {
        status: true
    }, {
        upsert: true,
        new: true
    });

}

/**
 * 
 * @param {GuildMember} member 
 */
async function switchOffNotifications(member) {

    let query = await Notification.findOneAndUpdate({
        discord_id: member.id
    }, {
        status: false
    }, {
        upsert: true,
        new: true
    });

}

/**
 * 
 * @param {GuildMember} member 
 */
async function getNotificationStatus(member) {

    let result = false;

    let query = await Notification.findOne({
        discord_id: member.id
    });

    if (query) {
        result = query.status;
    }

    return result

}

module.exports = {
    switchOffNotifications,
    switchOnNotifications,
    getNotificationStatus
}