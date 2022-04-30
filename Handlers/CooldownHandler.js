let model = require(`../Models/Cooldown`);

async function registerUserCooldowns() {

    let allCooldowns = await model.find();

    await allCooldowns.forEach(cl => {

        if (cl.type === "allTimeXP" || cl.type === "weeklyXP" || cl.type === "dailylb_reset") {
            return;
        } else {
            if (cl.type.includes(`Msg`)) return;


            setTimeout(() => {

                if (cl.type === "Rob") {
                    model.findOneAndDelete({
                        discord_id: cl.discord_id,
                        type: `RobMsg`
                    }).catch(err => console.log(err));
                }

                model.findOneAndDelete({
                    discord_id: cl.discord_id,
                    type: cl.type
                }).catch(err => console.log(err));
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