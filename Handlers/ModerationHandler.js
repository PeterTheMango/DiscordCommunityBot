const {
    GuildMember
} = require(`discord.js`);
const Cooldown = require("../Structures/Cooldown");
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

/**
 * 
 * @param {GuildMember} user 
 * @param {GuildMember} moderator 
 * @param {String} reason 
 * @returns True if the user was banned. False if not.
 */
async function noVcUser(user, moderator, reason) {

    const {
        novcRole
    } = require(`../Assets/Config.json`)

    let offenseModel = require(`../Models/Offense`);
    let {
        userVoiceBanLog
    } = require(`./Classes/ModerationLog`);
    let offense = await offenseModel.find({
        discord_id: user.id,
        type: "NoVC"
    });

    let offenseNum;
    if (!offense) offenseNum = 0
    else offenseNum = offense.length;

    let Log = new userVoiceBanLog(user, moderator, reason, offenseNum + 1, user.guild);

    let userBanned = true;
    let banRole = await user.guild.roles.cache.get(novcRole);
    if (!banRole) {
        userBanned = false;
        console.log(`Unable to voice ban users! noVCRole not setup.`);
        return userBanned;
    }

    await user.roles.add(banRole.id).catch(err => {
        userBanned = false;
        console.log(`Unable to assign noVCrole to users! Missing permission.`);
    });

    if (!userBanned) {
        return false;
    } else {
        let userOffense = new offenseModel({
            discord_id: user.id,
            type: "NoVC",
            reason: reason,
            moderator: moderator.id,
            date: new Date()
        });
        await userOffense.save().catch(err => console.log(err));
        await Log.sendLog();
        await Log.sendUserLog();

        let vcCooldown = new Cooldown(user, "novc", Date.now() + 1800000);
        await vcCooldown.save();
        return true;
    }


}

/**
 * 
 * @param {GuildMember} user 
 * @param {GuildMember} moderator 
 * @param {String} reason 
 * @returns True if the user was muted. False if not.
 */
async function muteUser(user, moderator, reason) {

    const {
        moderation,
    } = require(`../Assets/Config.json`)



    let offenseModel = require(`../Models/Offense`);
    let {
        userMuteLog
    } = require(`./Classes/ModerationLog`);
    let offense = await offenseModel.find({
        discord_id: user.id,
        type: "Mute"
    });

    let offenseNum;
    if (!offense) offenseNum = 0
    else offenseNum = offense.length;

    let Log = new userMuteLog(user, moderator, reason, offenseNum + 1, user.guild);

    let userBanned = true;
    let banRole = await user.guild.roles.cache.get(moderation.mute_role);
    if (!banRole) {
        userBanned = false;
        console.log(`Unable to mute users! muteRole not setup.`);
        return userBanned;
    }

    await user.roles.add(banRole.id).catch(err => {
        userBanned = false;
        console.log(`Unable to assign muteRole to users! Missing permission.`);
    });

    if (!userBanned) {
        return false;
    } else {
        let userOffense = new offenseModel({
            discord_id: user.id,
            type: "Mute",
            reason: reason,
            moderator: moderator.id,
            date: new Date()
        });
        await userOffense.save().catch(err => console.log(err));
        await Log.sendLog();
        await Log.sendUserLog();

        let muteCooldown = new Cooldown(user, "mute", Date.now() + 300000);
        await muteCooldown.save();
        return true;
    }


}

module.exports = {
    banUser,
    noVcUser,
    muteUser
}