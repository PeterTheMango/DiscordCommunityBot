const {
    Message
} = require("discord.js");
const Command = require(`../../Structures/Command`);
const Level = require(`../../Models/Level`);

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "synclevel",
            aliases: [],
            category: "Utilities",
            description: "Restores levels to users.",
            usage: "<user>"
        })
    }

    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {

        if (message.member.id !== "376308669576511500") return;

        await message.channel.send(`Getting all users now.`);

        let members = await message.guild.members.fetch({limit: message.guild.memberCount});

        await message.channel.send(`Got all users. Restoring roles now.`);

        await members.forEach(async m => {

            let roles = [
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

            if(m.roles.cache.get(roles[0])){
                return Level.findOneAndUpdate({discord_id: m.id},{
                    $set:{
                        discord_id: m.id,
                        xp: 0,
                        time: 0,
                        level: 83
                    }
                },{
                    upsert: true,
                    new: true
                });
            } else if(m.roles.cache.get(roles[1])){
                return Level.findOneAndUpdate({discord_id: m.id},{
                    $set:{
                        discord_id: m.id,
                        xp: 0,
                        time: 0,
                        level: 78
                    }
                },{
                    upsert: true,
                    new: true
                });
            } else if(m.roles.cache.get(roles[2])){
                return Level.findOneAndUpdate({discord_id: m.id},{
                    $set:{
                        discord_id: m.id,
                        xp: 0,
                        time: 0,
                        level: 73
                    }
                },{
                    upsert: true,
                    new: true
                });
            }else if(m.roles.cache.get(roles[3])){
                return Level.findOneAndUpdate({discord_id: m.id},{
                    $set:{
                        discord_id: m.id,
                        xp: 0,
                        time: 0,
                        level: 68
                    }
                },{
                    upsert: true,
                    new: true
                });
            }else if(m.roles.cache.get(roles[4])){
                return Level.findOneAndUpdate({discord_id: m.id},{
                    $set:{
                        discord_id: m.id,
                        xp: 0,
                        time: 0,
                        level: 63
                    }
                },{
                    upsert: true,
                    new: true
                });
            }else if(m.roles.cache.get(roles[5])){
                return Level.findOneAndUpdate({discord_id: m.id},{
                    $set:{
                        discord_id: m.id,
                        xp: 0,
                        time: 0,
                        level: 58
                    }
                },{
                    upsert: true,
                    new: true
                });
            }else if(m.roles.cache.get(roles[6])){
                return Level.findOneAndUpdate({discord_id: m.id},{
                    $set:{
                        discord_id: m.id,
                        xp: 0,
                        time: 0,
                        level: 53
                    }
                },{
                    upsert: true,
                    new: true
                });
            }else if(m.roles.cache.get(roles[7])){
                return Level.findOneAndUpdate({discord_id: m.id},{
                    $set:{
                        discord_id: m.id,
                        xp: 0,
                        time: 0,
                        level: 48
                    }
                },{
                    upsert: true,
                    new: true
                });
            }
            else if(m.roles.cache.get(roles[8])){
                return Level.findOneAndUpdate({discord_id: m.id},{
                    $set:{
                        discord_id: m.id,
                        xp: 0,
                        time: 0,
                        level: 43
                    }
                },{
                    upsert: true,
                    new: true
                });
            }else if(m.roles.cache.get(roles[9])){
                return Level.findOneAndUpdate({discord_id: m.id},{
                    $set:{
                        discord_id: m.id,
                        xp: 0,
                        time: 0,
                        level: 38
                    }
                },{
                    upsert: true,
                    new: true
                });
            }
            else if(m.roles.cache.get(roles[10])){
                return Level.findOneAndUpdate({discord_id: m.id},{
                    $set:{
                        discord_id: m.id,
                        xp: 0,
                        time: 0,
                        level: 33
                    }
                },{
                    upsert: true,
                    new: true
                });
            }else if(m.roles.cache.get(roles[11])){
                return Level.findOneAndUpdate({discord_id: m.id},{
                    $set:{
                        discord_id: m.id,
                        xp: 0,
                        time: 0,
                        level: 28
                    }
                },{
                    upsert: true,
                    new: true
                });
            }else if(m.roles.cache.get(roles[12])){
                return Level.findOneAndUpdate({discord_id: m.id},{
                    $set:{
                        discord_id: m.id,
                        xp: 0,
                        time: 0,
                        level: 23
                    }
                },{
                    upsert: true,
                    new: true
                });
            }else if(m.roles.cache.get(roles[13])){
                return Level.findOneAndUpdate({discord_id: m.id},{
                    $set:{
                        discord_id: m.id,
                        xp: 0,
                        time: 0,
                        level: 18
                    }
                },{
                    upsert: true,
                    new: true
                });
            }else if(m.roles.cache.get(roles[14])){
                return Level.findOneAndUpdate({discord_id: m.id},{
                    $set:{
                        discord_id: m.id,
                        xp: 0,
                        time: 0,
                        level: 13
                    }
                },{
                    upsert: true,
                    new: true
                });
            }else if(m.roles.cache.get(roles[15])){
                return Level.findOneAndUpdate({discord_id: m.id},{
                    $set:{
                        discord_id: m.id,
                        xp: 0,
                        time: 0,
                        level: 8
                    }
                },{
                    upsert: true,
                    new: true
                });
            }
            else if(m.roles.cache.get(roles[16])){
                return Level.findOneAndUpdate({discord_id: m.id},{
                    $set:{
                        discord_id: m.id,
                        xp: 0,
                        time: 0,
                        level: 3
                    }
                },{
                    upsert: true,
                    new: true
                });
            }

        });

        await message.channel.send(`Levels restored!`)


    }

}