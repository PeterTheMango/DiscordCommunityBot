const {
    Message,
    MessageEmbed
} = require("discord.js");
const Event = require(`../Structures/Event`);
const db_instance = require(`../Handlers/Database`);
const CooldownManager = require(`../Models/Cooldown`);
const Cooldown = require(`../Structures/Cooldown`);
const Emotes = require(`../Handlers/EmoteHandler`);
const format_time = require(`humanize-duration`);
const ChatHandler = require(`../Handlers/ChatHandler`);
const Config = require(`../Assets/Config.json`);

module.exports = class extends Event {

    /**
     * 
     * @param {Message} message 
     */
    async emit(message) {

        if (message.author.bot || (message.channel.type === "DM" && !message.content.toLowerCase().includes(`dm`))) return;

        // if (![`192715014602358784`, `376308669576511500`].includes(message.author.id)) return;

        let hasRobCooldown = await CooldownManager.findOne({
            discord_id: message.member.id,
            type: "RobMsg"
        });

        if (hasRobCooldown) {

            if (hasRobCooldown.end > 1) {
                let newCooldown = await CooldownManager.findOneAndUpdate({
                    discord_id: message.member.id,
                    type: "RobMsg"
                }, {
                    discord_id: hasRobCooldown.discord_id,
                    type: hasRobCooldown.type,
                    end: hasRobCooldown.end - 1
                }, {
                    new: true
                });
            } else {
                await CooldownManager.findOneAndDelete({
                    discord_id: message.member.id,
                    type: "RobMsg"
                });
                await CooldownManager.findOneAndDelete({
                    discord_id: message.member.id,
                    type: "Rob"
                });
            }
        }

        if (Config.channels.chatting_channels.includes(message.channel.id)) {
            await ChatHandler.addMessage(message.member);
            let userWeeklyData = await ChatHandler.getWeeklyUserData(message.member);
            if (userWeeklyData.reward_messages === 10) {

                const RewardEmbed = new MessageEmbed({
                    title: `MEMBER REWARDED`,
                    description: `<a:tickticktick:935198882172903434> ${message.member} sent **50** messages and earned **6** credits`,
                    footer: {
                        iconURL: `https://i.imgur.com/7sH3KQg.png`,
                        text: `You can send messages to earn credits!`
                    }
                });

                await message.channel.send({
                    embeds: [RewardEmbed]
                });

                await ChatHandler.resetWeeklyRewardMessages(message.member);

            }

            let messageData = await ChatHandler.getUserData(message.member);
            let roleID, rewardMessages;
            let roleRewardEmbed = new MessageEmbed({
                title: `MEMBER REWARDED!`,
                description: `<a:blue_diamond:941834977337810944> ${message.member} sent **{messages}** messages and earned the {role} role!`,
                footer: {
                    iconURL: `https://i.imgur.com/7sH3KQg.png`,
                    text: `You can send messages to earn roles!`
                }
            });
            if (messageData.reward_messages === 1) {

                roleID = "870709033240232008";
                rewardMessages = 250;
                let role = await message.guild.roles.cache.get(roleID);
                if (role) {
                    await message.member.roles.add(role.id);
                    await message.channel.send({
                        embeds: [
                            roleRewardEmbed
                            .setDescription(roleRewardEmbed.description
                                .replace(`{messages}`, rewardMessages.toString())
                                .replace(`{role}`, `${role}`)
                            )
                            .setThumbnail(`https://i.imgur.com/JP6JYOd.png`)
                        ]
                    });
                }

            } else if (messageData.reward_messages === 2) {

                roleID = "870709057202303067";
                rewardMessages = 500;
                let role = await message.guild.roles.cache.get(roleID);
                if (role) {
                    await message.member.roles.add(role.id);
                    await message.channel.send({
                        embeds: [
                            roleRewardEmbed
                            .setDescription(roleRewardEmbed.description
                                .replace(`{messages}`, rewardMessages.toString())
                                .replace(`{role}`, `${role}`)
                            )
                            .setThumbnail(`https://i.imgur.com/vPy4GCZ.png`)
                        ]
                    });
                }

            } else if (messageData.reward_messages === 3) {

                roleID = "870709033240232008";
                rewardMessages = 1000;
                let role = await message.guild.roles.cache.get(roleID);
                if (role) {
                    await message.member.roles.add(role.id);
                    await message.channel.send({
                        embeds: [
                            roleRewardEmbed
                            .setDescription(roleRewardEmbed.description
                                .replace(`{messages}`, rewardMessages.toString())
                                .replace(`{role}`, `${role}`)
                            )
                            .setThumbnail(`https://i.imgur.com/JU8L3jo.png`)
                        ]
                    });
                }

            } else if (messageData.reward_messages === 4) {

                roleID = "870709033240232008";
                rewardMessages = 1500;
                let role = await message.guild.roles.cache.get(roleID);
                if (role) {
                    await message.member.roles.add(role.id);
                    await message.channel.send({
                        embeds: [
                            roleRewardEmbed
                            .setDescription(roleRewardEmbed.description
                                .replace(`{messages}`, rewardMessages.toString())
                                .replace(`{role}`, `${role}`)
                            )
                            .setThumbnail(`https://i.imgur.com/e8TWxHE.png`)
                        ]
                    });
                }

            } else if (messageData.reward_messages === 5) {

                roleID = "870709033240232008";
                rewardMessages = 2000;
                let role = await message.guild.roles.cache.get(roleID);
                if (role) {
                    await message.member.roles.add(role.id);
                    await message.channel.send({
                        embeds: [
                            roleRewardEmbed
                            .setDescription(roleRewardEmbed.description
                                .replace(`{messages}`, rewardMessages.toString())
                                .replace(`{role}`, `${role}`)
                            )
                            .setThumbnail(`https://i.imgur.com/uib9SRh.png`)
                        ]
                    });
                }

            } else if (messageData.reward_messages === 6) {

                roleID = "870709033240232008";
                rewardMessages = 6000;
                let role = await message.guild.roles.cache.get(roleID);
                if (role) {
                    await message.member.roles.add(role.id);
                    await message.channel.send({
                        embeds: [
                            roleRewardEmbed
                            .setDescription(roleRewardEmbed.description
                                .replace(`{messages}`, rewardMessages.toString())
                                .replace(`{role}`, `${role}`)
                            )
                            .setThumbnail(`https://i.imgur.com/CtZS6A6.png`)
                        ]
                    });
                }

            } else if (messageData.reward_messages === 7) {

                roleID = "870709033240232008";
                rewardMessages = 6000;
                let role = await message.guild.roles.cache.get(roleID);
                if (role) {
                    await message.member.roles.add(role.id);
                    await message.channel.send({
                        embeds: [
                            roleRewardEmbed
                            .setDescription(roleRewardEmbed.description
                                .replace(`{messages}`, rewardMessages.toString())
                                .replace(`{role}`, `${role}`)
                            )
                            .setThumbnail(`https://i.imgur.com/e0waPi4.png`)
                        ]
                    });
                }

            } else if (messageData.reward_messages === 8) {

                roleID = "870709033240232008";
                rewardMessages = 8000;
                let role = await message.guild.roles.cache.get(roleID);
                if (role) {
                    await message.member.roles.add(role.id);
                    await message.channel.send({
                        embeds: [
                            roleRewardEmbed
                            .setDescription(roleRewardEmbed.description
                                .replace(`{messages}`, rewardMessages.toString())
                                .replace(`{role}`, `${role}`)
                            )
                            .setThumbnail(`https://i.imgur.com/FM8rD9i.png`)
                        ]
                    });
                }

            } else if (messageData.reward_messages === 9) {

                roleID = "870709033240232008";
                rewardMessages = 10000;
                let role = await message.guild.roles.cache.get(roleID);
                if (role) {
                    await message.member.roles.add(role.id);
                    await message.channel.send({
                        embeds: [
                            roleRewardEmbed
                            .setDescription(roleRewardEmbed.description
                                .replace(`{messages}`, rewardMessages.toString())
                                .replace(`{role}`, `${role}`)
                            )
                            .setThumbnail(`https://i.imgur.com/U5L4yXD.png`)
                        ]
                    });
                }

            } else if (messageData.reward_messages === 10) {

                roleID = "870709033240232008";
                rewardMessages = 20000;
                let role = await message.guild.roles.cache.get(roleID);
                if (role) {
                    await message.member.roles.add(role.id);
                    await message.channel.send({
                        embeds: [
                            roleRewardEmbed
                            .setDescription(roleRewardEmbed.description
                                .replace(`{messages}`, rewardMessages.toString())
                                .replace(`{role}`, `${role}`)
                            )
                            .setThumbnail(`https://i.imgur.com/h37fvmA.png`)
                        ]
                    });
                }

            } else if (messageData.reward_messages === 11) {

                roleID = "870709033240232008";
                rewardMessages = 30000;
                let role = await message.guild.roles.cache.get(roleID);
                if (role) {
                    await message.member.roles.add(role.id);
                    await message.channel.send({
                        embeds: [
                            roleRewardEmbed
                            .setDescription(roleRewardEmbed.description
                                .replace(`{messages}`, rewardMessages.toString())
                                .replace(`{role}`, `${role}`)
                            )
                            .setThumbnail(`https://i.imgur.com/QKrcMjC.png`)
                        ]
                    });
                }

            }
        }

        let db = await db_instance.getDatabase();

        let prefix = '.';

        if (!message.content.startsWith(prefix)) return;

        const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
        if (command) {

            let cooldown_embed = new MessageEmbed({
                description: `${message.member} <a:egp_no:935209428070854717> Please wait %time_left% before running another command!`,
                footer: {
                    text: `You can use a command every 3 seconds.`,
                    iconURL: Emotes.BELL
                },
                color: `RED`
            });

            if (!Config.channels.command_channels.includes(message.channel.id)) return;

            let hasCommandCooldown = await CooldownManager.findOne({
                discord_id: message.member.id,
                type: "Command"
            });

            if (hasCommandCooldown) return message.channel.send({
                embeds: [cooldown_embed.setDescription(cooldown_embed.description.replace(`%time_left%`, `**${format_time(hasCommandCooldown.end - Date.now(), { round: true })}**`))]
            });

            let commandCooldown = new Cooldown(message.member, "Command", Date.now() + 3000);
            await commandCooldown.save();
            try {
                await command.execute(message, args, db)
            } catch (err) {
                logError(err);
                console.log(err)
            };

        }

    }

}

/**
 * 
 * @param {Error} err 
 */
async function logError(err) {
    let fs = require(`fs`);
    return fs.createWriteStream(`./Logs/latest.log`).write(err.stack.toString());

}