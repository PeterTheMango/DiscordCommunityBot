const {
    MessageEmbed
} = require("discord.js");
const Emotes = require(`../Handlers/EmoteHandler`);
const divider = [`https://i.imgur.com/FdEPAdP.gif`, `https://media.discordapp.net/attachments/859883140423614474/859883158493593600/dividerrr.gif`];
let dividerIndex = 0;

const WELCOME = new MessageEmbed({
    color: 'LUMINOUS_VIVID_PINK',
    title: 'Welcome to E-Girl Paradise!',
    description: '<a:loveheart:935532800373833858> **Feel free to chat with us in the following channels:**\n<a:staridk4:948470333755785296> <#790439605655699456>\n<a:staridk3:948470333495721985> <#790439743397560361>\n<a:staridk2:948470333474766869> <#790440385289388083>\n<a:staridk:948470333768355851> <#861749492734885918>\n\n<a:shinystar:944350729886396426> Additionally, feel free to come and hangout in our **voice-channels to meet new people, level up** and **make new friends** by [clicking here](https://discord.gg/GUyMtqprCg)',
    thumbnail: "https://cdn.discordapp.com/icons/727649662475173962/a_b0e71799d16f310bfde4182ee2ae96e6.gif",
    footer: {
        iconURL: Emotes.PURPLE_DIAMOND,
        text: 'Enjoy your stay in the server!'
    }
});

const NEW_USER_CHANNEL = new MessageEmbed({
    title: 'Welcome to E-Girl Paradise!',
    description: `<a:shinystar:811665342023073882> **Come chat in** <#790439605655699456>, <#790439743397560361>, <#790440385289388083>, <#861749492734885918>\n\n <a:neonheart:818739696301113354> **Grab some** <#936475008493039676>\n\n<a:animblueheartcrop:819106408833351701> [Come join us in VC!](https://discord.gg/c88dUg5bDk) <a:animblueheartcrop:819106408833351701>`,
    thumbnail: "https://cdn.discordapp.com/emojis/859882092334153758.gif",
    footer: {
        iconURL: Emotes.CHAT_HEART,
        text: `Enjoy your stay!`
    },
    color: "RANDOM"
})

module.exports = {
    WELCOME,
    NEW_USER_CHANNEL,
    setDivider,
    divider
}

async function setDivider() {
    if (dividerIndex === 0) {
        dividerIndex++;
    } else {
        dividerIndex = 0;
    }
    return dividerIndex;
}