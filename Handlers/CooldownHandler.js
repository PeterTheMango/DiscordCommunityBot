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
                    userVoiceBanLog
                } = require(`../Handlers/Classes/ModerationLog`);
                let {
                    novcRole
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
                    await member.roles.remove(novcRole).catch(err => `Unable to remove novc role from users. Missing perms/error?\n\n${err.toString()}`);
                }

                if (cl.type === "mute") {
                    let client = await getClient();
                    let guild = await client.guilds.cache.get(`727649662475173962`);
                    if (!guild) return;
                    let member = await guild.members.cache.get(cl.discord_id);
                    if (!member) return;
                    let noVC = new userVoiceBanLog(member, null, null, 0, guild);
                    await noVC.sendUserComplete();
                    await member.roles.remove(novcRole).catch(err => `Unable to remove mute role from users. Missing perms/error?\n\n${err.toString()}`);
                }


            }, cl.end - Date.now())
        }
    })

};


async function registerDailyCooldowns(dailyLbCollection) {

    return new Promise(async (res, rej) => {
        let allCooldowns = await model.find();

        await allCooldowns.forEach(cl => {

            if (cl.type === "dailylb_reset") {
                let lb = dailyLbCollection.get(cl.discord_id);
                if (lb) {
                    setTimeout(() => {
                        lb.reset();
                    }, cl.end - Date.now())
                }
                return;
            }

        });
    })

};


async function registerWeeklyCooldowns(weeklyLbCollection) {

    return new Promise(async (res, rej) => {
        let allCooldowns = await model.find();

        await allCooldowns.forEach(cl => {

            if (cl.type === "weeklylb_reset") {
                let lb = weeklyLbCollection.get(cl.discord_id);
                if (lb) {
                    setTimeout(() => {
                        lb.reset();
                    }, cl.end - Date.now())
                }
                return;
            }

        });
    })

};

module.exports = {
    registerDailyCooldowns,
    registerUserCooldowns,
    registerWeeklyCooldowns
}