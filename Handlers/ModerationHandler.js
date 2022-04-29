const {
    GuildMember
} = require(`discord.js`);
/**
 * 
 * @param {GuildMember} user 
 * @param {GuildMember} moderator 
 * @param {String} reason 
 * @returns True if the user was banned. False if not.
 */
async function banUser(user, moderator, reason) {
    let offenseModel = require(`../Models/Offense`);
    let {
        userBanLog
    } = require(`./Classes/ModerationLog`);
    let offense = await offenseModel.find({
        discord_id: user.id,
        type: "Ban"
    });

    let offenseNum;
    if (!offense) offenseNum = 0
    else offenseNum = offense.length;

    let Log = new userBanLog(user, moderator, reason, offenseNum + 1, user.guild);

    let userBanned = true;
    if (!user.bannable) {
        userBanned = false;
    } else {
        await Log.sendUserLog();
        await user.ban({
            reason: reason,
            days: 7
        }).catch(err => userBanned = false);
    }
    if (!userBanned) {
        return false;
    } else {
        let userOffense = new offenseModel({
            discord_id: user.id,
            type: "Ban",
            reason: reason,
            moderator: moderator.id,
            date: new Date()
        });
        await userOffense.save().catch(err => console.log(err));
        await Log.sendLog();
        return true;
    }

}

module.exports = {
    banUser
}