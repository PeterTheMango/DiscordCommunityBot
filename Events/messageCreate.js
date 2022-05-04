const {
    Message
} = require("discord.js");
const Event = require(`../Structures/Event`);
const db_instance = require(`../Handlers/Database`);
const CooldownManager = require(`../Models/Cooldown`);

module.exports = class extends Event {

    /**
     * 
     * @param {Message} message 
     */
    async emit(message) {

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

        if (![`192715014602358784`, `376308669576511500`].includes(message.author.id)) return;

        let db = await db_instance.getDatabase();

        if (message.author.bot || (message.channel.type === "DM" && !message.content.toLowerCase().includes(`dm`))) return;

        let prefix = '.';

        if (!message.content.startsWith(prefix)) return;

        const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
        if (command) {

            let cooldown_embed = new MessageEmbed({
                description: `${message.member} <a:egp_no:935209428070854717> Please wait %time_left% before running another command!`,
                footer: {
                    text: `You can use a command every 5 seconds.`,
                    iconURL: Emotes.BELL
                },
                color: `RED`
            });

            let hasCommandCooldown = await CooldownManager.findOne({
                discord_id: message.member.id,
                type: "Command"
            });

            if (hasRobCooldown) return message.channel.send({
                embeds: [cooldown_embed.setDescription(cooldown_embed.description.replace(`%time_left%`, `**${format_time(hasCommandCooldown.end - Date.now(), {round: true})}**`))]
            });

            await command.execute(message, args, db);

            let commandCooldown = new CooldownManager(message.member.id, "Command", Date.now() + 5000);
            await commandCooldown.save();
        }

    }

}