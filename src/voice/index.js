// npm i discord.js ms moment moment-duration-format glob util path

const {
    init
} = require(`./Structures/Client`);
const Config = require(`./Assets/Config.json`);

init(Config);