const {
    Guild,
    TextChannel,
    Message,
    MessageEmbed
} = require("discord.js");
const DailyChat = require(`../../Models/DailyChat`);
const Cooldown = require(`../../Structures/Cooldown`);
const CooldownsRecords = require(`../../Models/Cooldown`);
const Leaderboard = require(`../../Models/Leaderboard`);
const format = require(`humanize-duration`);

class DailyChatLeaderboard {

    /**
     * 
     * @param {Guild} guild 
     * @param {TextChannel} channel 
     * @param {{discord_id: String, messages: Number}[]} leaders
     * @param {Message} message
     */
    constructor(guild, channel, leaders, message) {
        this.guild = guild;
        this.channel = channel;
        this.leaders = leaders;
        this.message = message || null;
    }

    /**
     * Resets the leaderboard and the data associated with it.
     */
    async reset() {

        await DailyChat.deleteMany({}).catch(err => console.log(`Unable to drop Daily Chat collection. See Error Below!\n\n${err.toString()}`));
        let currentCooldown = await CooldownsRecords.find({
            discord_id: this.message.id,
            type: "dailychatlb_reset"
        });
        if (currentCooldown) {
            await CooldownsRecords.deleteOne({
                discord_id: this.message.id,
                type: "dailychatlb_reset"
            });
        }
        let dailyCooldown = new Cooldown(this.message, "dailychatlb_reset", Date.now() + 86400000);
        await dailyCooldown.save();

        await setTimeout(async () => this.reset(), 86400000);


    }

    /**
     * Updates the data found on the leaderboard
     */
    async update() {

        const {
            divider,
            setDivider
        } = require(`../EmbedHandler`);

        const {
            getDailyLeaders
        } = require(`../ChatHandler`);

        this.cooldown = await CooldownsRecords.findOne({
            discord_id: this.message.id,
            type: "dailychatlb_reset"
        });

        if (!this.cooldown) this.cooldown = Date.now() + 300000

        this.leaders = await getDailyLeaders();

        let leaderboardEmbed = new MessageEmbed({
            title: "Daily Leaderboard [Messages]",
            color: "RANDOM",
            thumbnail: {
                url: "https://cdn.discordapp.com/icons/727649662475173962/a_b0e71799d16f310bfde4182ee2ae96e6.gif"
            },
            footer: {
                iconURL: "https://cdn.discordapp.com/icons/727649662475173962/a_b0e71799d16f310bfde4182ee2ae96e6.gif",
                text: "E-Girl Paradise | Updates every 5 minutes"
            },
            image: {
                url: divider[await setDivider()]
            }
        });

        let placementIcons = ["<:star1:955048718187499520>",
            "<:starr2:955048718518878308>",
            "<:star3:955048718275608656>",
            "<:star4:955048717986201671>",
            "<:star5:955048718237827082>",
            "<:star6:955048716786618398>",
            "<:star7:955048716417523735>",
            "<:star8:955048716350394428>",
            "<:star9:955048716719521792>",
            "<:star10:955048716224577546>"
        ];

        let topTenMembers = "";

        for (let i = 0; i < this.leaders.length; i++) {

            topTenMembers += `${placementIcons[i]} <@${this.leaders[i].discord_id}> <a:arrowegp:852967066381844520> **${this.leaders[i].messages}**\n`;

        }

        topTenMembers += `\n\n<a:egpruby:852965552674832384> **Gain XP by becoming active in our** [chats](https://discord.gg/c88dUg5bDk)\n<a:egpruby:852965552674832384> **Gain VC Points by becoming active in our** [VCs](https://discord.gg/c88dUg5bDk)\n\n<a:resetegp:763157953241940049> Resets in **${format(this.cooldown.end - Date.now(), {round: true})}**`

        await this.message.edit({
            embeds: [leaderboardEmbed.setDescription(topTenMembers)]
        });

    }

    /**
     * 
     * @returns {Promise<*>} The database gson object saved.
     */
    async save() {

        /*
        channel_id: String,
            guild_id: String,
            message_id: String,
            type: String
         */

        let insert = new Leaderboard({
            channel_id: this.channel.id,
            guild_id: this.guild.id,
            message_id: this.message.id,
            type: "Daily_Chat"
        });

        await insert.save().catch(err => console.log(`Unable to save new Daily Chat Leaderboard. Error:\n${err.toString()}`));

        let insertCooldown = new Cooldown(this.message, "dailychatlb_reset", Date.now() + 86400000);
        await insertCooldown.save();

        setTimeout(async () => this.reset(), 86400000);

        return {
            Leaderboard: insert,
            Cooldown: insertCooldown
        };

    }

    async send() {

        let tempEmbed = new MessageEmbed({
            title: "Generating Leaderboard..."
        });

        let leaderboard = await this.channel.send({
            embeds: [tempEmbed]
        });
        this.message = leaderboard;

        await this.update();

        await setInterval(async () => {

            await this.update();

        }, 300000);

    }


}

module.exports = DailyChatLeaderboard;