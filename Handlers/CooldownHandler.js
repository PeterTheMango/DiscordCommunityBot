let model = require(`../Models/Cooldown`);
const {
    getClient
} = require("../Structures/Client");

async function registerUserCooldowns() {

    let allCooldowns = await model.find();

    await allCooldowns.forEach(cl => {

        if (cl.type === "allTimeXP" || cl.type === "weeklyXP" || cl.type === "dailylb_reset") {
            return;
        } else {
            if (cl.type.includes(`Msg`)) return;


            setTimeout(async () => {

                if (cl.type === "Rob") {
                    model.findOneAndDelete({
                        discord_id: cl.discord_id,
                        type: `RobMsg`
                    }).catch(err => console.log(err));
                }

                let {
                    userVoiceBanLog,
                    userMuteLog
                } = require(`../Handlers/Classes/ModerationLog`);
                let {
                    novcRole,
                    moderation
                } = require(`../Assets/Config.json`);

                model.findOneAndDelete({
                    discord_id: cl.discord_id,
                    type: cl.type
                }).catch(err => console.log(err));

                if (cl.type === "novc") {
                    let client = await getClient();
                    let guild = await client.guilds.cache.get(`727649662475173962`);
                    if (!guild) return;
                    let member = await guild.members.cache.get(cl.discord_id);
                    if (!member) return;
                    let noVC = new userVoiceBanLog(member, null, null, 0, guild);
                    await noVC.sendUserComplete();
                    await member.roles.remove(novcRole).catch(err => `Unable to remove novc role from users. Missing perms/error?\n\n` + err);
                }

                if (cl.type === "mute") {
                    let client = await getClient();
                    let guild = await client.guilds.cache.get(`727649662475173962`);
                    if (!guild) return;
                    let member = await guild.members.cache.get(cl.discord_id);
                    if (!member) return;
                    let muted = new userMuteLog(member, null, null, 0, guild);
                    await muted.sendUserComplete();
                    await member.roles.remove(moderation.mute_role).catch(err => `Unable to remove mute role from users. Missing perms/error?\n\n$` + err);
                }


            }, cl.end - Date.now())
        }
    })

};


async function registerDailyCooldowns(dailyLbCollection) {

    let xpCooldowns = await model.find({
        type: "dailylb_reset"
    });

    await xpCooldowns.forEach(async cl => {
        let lb = await dailyLbCollection.get(cl.discord_id);
        if (lb) {
            console.log(`found`);
            await setTimeout(async () => {
                await console.log(`Yeah i reset lbs`);
                await lb.reset()
            }, cl.end - Date.now());
        }
    });

    let chatCooldowns = await model.find({
        type: "dailychatlb_reset"
    });

    await chatCooldowns.forEach(async cl => {
        let lb = await dailyLbCollection.get(cl.discord_id);
        if (lb) {
            console.log(`found2`);
            await setTimeout(async () => {
                await console.log(`Yeah i reset lbs2`);
                await lb.reset()
            }, cl.end - Date.now());
        }
    });

    return {
        xpCooldowns,
        chatCooldowns
    }

};


async function registerWeeklyCooldowns(weeklyLbCollection) {

    let xpCooldowns = await model.find({
        type: "weeklylb_reset"
    });

    await xpCooldowns.forEach(async cl => {
        let lb = await dailyLbCollection.get(cl.discord_id);
        if (lb) {
            console.log(`found`);
            await setTimeout(async () => {
                await console.log(`Yeah i reset lbs`);
                await lb.reset()
            }, cl.end - Date.now());
        }
    });

    let chatCooldowns = await model.find({
        type: "weeklychatlb_reset"
    });

    await chatCooldowns.forEach(async cl => {
        let lb = await dailyLbCollection.get(cl.discord_id);
        if (lb) {
            console.log(`found2`);
            await setTimeout(async () => {
                await console.log(`Yeah i reset lbs2`);
                await lb.reset()
            }, cl.end - Date.now());
        }
    });

    return {
        xpCooldowns,
        chatCooldowns
    }

};

module.exports = {
    registerDailyCooldowns,
    registerUserCooldowns,
    registerWeeklyCooldowns
}