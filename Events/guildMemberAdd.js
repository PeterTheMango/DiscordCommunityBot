const {
    GuildMember,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const Event = require(`../Structures/Event`);
const Embeds = require(`../Handlers/EmbedHandler`);
const Config = require(`../Assets/Config.json`);

module.exports = class extends Event {

    /**
     * 
     * @param {GuildMember} member 
     */
    async emit(member) {



        // User Direct Messages
        await member.send({
            content: `\`\`\`AFFIILIATED SERVERS\`\`\`\n\n💬 **Socialize:** Fun discord server with tons of people to meet! Gambling bots, vc-leveling, 🔊 come join and have fun with us! :link: https://discord.gg/SSX2mbBkTK\n\n💬 **ChillZone:** A highly active socializing server with 300k members, advanced economy, gambling, and advanced custom voice channels! 🔗 https://discord.gg/jCdJxNgKK6\n\n💬 **Diversity:**  💬 We are a chill active Discord server which is rapidly growing by the day! • 🎉 Always hosting plenty of giveaways!🔗 https://discord.gg/c3UCaCPss5\n\n:palm_tree: **Paradise Isle:** Active anime themed social server with 500 emotes, fun bots, frequent giveaways & tons of events! :link: https://discord.gg/hot\n\n💋 **smexc:** chill server with egirls, active, dozens of nitro giveaways, tons of emotes, anime & more !! :link: https://discord.gg/8jY2WpR5Y6\n\n😈 **Sinful:** No.1 Adults Verified. Voice Calls. Chats. :link: https://discord.gg/sinful\n\n:star: **Daddy**: Really active Discord Server with a 1:1 Male to Female Ratio, over (200-300)+ users who are always active in VC and chat, daily exciting events, and Nitro Giveaway. :link: https://discord.gg/UHSFvmZhA4\n\n:cow: **milkers:** active chat & vcs, **500** emotes, plenty of **stickers & icons**, tons of **egirls & eboys** :link: https://discord.gg/d2XRXEzkkZ\n\n:cloud: **kittens**: *nyaa~! kittens, come find your discord kitten! tons of e-girls & cute kittens, 500+ emotes* :link: https://discord.gg/TcsNpmZk9S\n\n:cherries: **ｅ-ｄｇｙ:** Dystopian cyberpunk server with the best memes and the biggest misfits! 340k+ members, always active voice and text channels. Join us! :link: https://discord.gg/cQtUTXFVaP 
`,
            embeds: [Embeds.WELCOME.setThumbnail(`https://cdn.discordapp.com/icons/727649662475173962/a_b0e71799d16f310bfde4182ee2ae96e6.gif`)],
        }).catch(err => console.log(`Unable to send message to ${member.user.username}! Reason: Locked DMs.`));

        // Guild Messages

        let button1 = new MessageButton({
            style: "LINK",
            customID: `getRolesButton`,
            emoji: "972306965697015888",
            label: "Grab Roles!",
            url: "https://discord.com/channels/727649662475173962/936475008493039676"
        });

        let buttonRow = new MessageActionRow({
            components: [button1]
        });

        let welcome_channel = member.guild.channels.cache.get(Config.channels.welcome_channel);
        if (welcome_channel) {
            let i = await Embeds.setDivider();
            await welcome_channel.send({
                content: `<a:egp_cat:823791708436824074> **Welcome** ${member}\n<a:notenote:972291314580328458> \`Restart your Discord if you can't join a vc or see chat move\``,
                embeds: [Embeds.NEW_USER_CHANNEL.setAuthor({
                    name: member.user.tag,
                    iconURL: member.displayAvatarURL({
                        dynamic: true
                    })
                }).setImage(Embeds.divider[i]).setThumbnail(`https://cdn.discordapp.com/emojis/859882092334153758.gif`)],
                components: [buttonRow]
            }).catch(m => console.log(`Unable to send message in welcome_channel. Missing Perms.`));
        }

    }

}