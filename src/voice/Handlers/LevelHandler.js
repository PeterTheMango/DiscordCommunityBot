const {
    GuildMember,
    Collection,
    MessageEmbed,
    Guild
} = require("discord.js");
const Level = require(`../Models/Level`);
const DailyXP = require(`../Models/DailyXP`);
const WeeklyXP = require(`../Models/WeeklyXP`);
const {
    getNotificationStatus
} = require(`./NotificationHandler`);

const usersBeingTracked = new Collection();

/**
 * 
 * @param {GuildMember} member 
 * @param {Number} xpToAdd 
 */
async function addXP(member, xpToAdd) {

    let result = await Level.findOne({
        discord_id: member.id
    });

    if (!result) {
        result = new Level({
            discord_id: member.id,
            xp: 0,
            level: 1,
            time: 0
        });

        await result.save().catch(err => console.log(err));
    }

    let update = await Level.findOneAndUpdate({
        discord_id: member.id
    }, {
        discord_id: member.id,
        level: result.level,
        $inc: {
            xp: xpToAdd,
            time: 60000
        }
    }, {
        upsert: true,
        new: true
    });

    let dailyXpUpdate = await DailyXP.findOneAndUpdate({
        discord_id: member.id
    }, {
        discord_id: member.id,
        $inc: {
            xp: xpToAdd
        }
    }, {
        upsert: true,
        new: true
    });

    let weeklyXpUpdate = await WeeklyXP.findOneAndUpdate({
        discord_id: member.id
    }, {
        discord_id: member.id,
        $inc: {
            xp: xpToAdd
        }
    }, {
        upsert: true,
        new: true
    });

    let {
        xp,
        level
    } = update;

    const needed = getNeededXP(level);

    if (xp >= needed) {
        level++;
        xp -= needed;

        const levelUpEmbed = new MessageEmbed({
            color: "#F8C8DC",
            author: {
                iconURL: member.displayAvatarURL({
                    dynamic: true
                }),
                name: member.user.tag
            },
            title: "LEVEL UP!",
            thumbnail: {
                url: "https://i.imgur.com/JP6JYOd.png"
            },
            image: {
                url: "https://media.discordapp.net/attachments/933191674870513736/935202228598366268/divider.gif"
            },
            description: `<a:blue_diamond:941834977337810944> You just leveled up to **level ${level}** in VC!`,
            footer: {
                iconURL: "https://i.imgur.com/7sH3KQg.png",
                text: "Type .dms off to disable level-up notifications"
            }
        });

        await Level.updateOne({
            discord_id: member.id
        }, {
            xp: xp,
            level: level
        });

        let notifStatus = await getNotificationStatus(member);

        if (notifStatus) {
            await member.send({
                embeds: [levelUpEmbed]
            }).catch(err => console.log(`Unable to message ${member.user.tag}! Reason: Locked DMs.`));
        }

        await giveLevelRank(member);
    }

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
        needed = 300000;
    } else if (level >= 10) {
        needed = 1000;
    } else {
        needed = 110;
    }
    return needed;
}

/**
 * Starts tracking all those members that are already in a vc when the bot restarts.
 * @param {Guild} guild 
 */
async function startTrackingExisting(guild) {

    console.log(`Starting to track all active members in vc. Please allow me to fetch all users.`)
    let members = await guild.members.fetch();
    console.log(`Members fetched! Please allow me to filter them now.`);
    members = members.filter(m => m.voice.channel);
    console.log(`Members Filtered! Starting To Track Them Now!`)

    members.forEach(m => startTracking(m));

}

/**
 * 
 * @param {GuildMember} member 
 */
async function startTracking(member) {

    let interval = setInterval(async =>{
        let xpToAdd = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
        addXP(member, xpToAdd);
    }, 60000);

    usersBeingTracked.set(member.id, interval);

}

/**
 * 
 * @param {GuildMember} member 
 */
async function stopTracking(member) {
    let trackingInstance = await usersBeingTracked.get(member.id);
    if (trackingInstance) {
        clearInterval(trackingInstance);
    }
}


module.exports = {
    startTracking,
    stopTracking,
    startTrackingExisting
}