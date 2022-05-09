// npm i discord.js ms moment moment-duration-format glob util path colors

const {
    init
} = require(`./Structures/Client`);
const Config = require(`./Assets/Config.json`);
const fs = require(`fs`);

init(Config).catch(err => logError(err));

/**
 * 
 * @param {Error} err 
 */
let logError = async function (err) {

    let saveLog = await fs.writeFile(`${__dirname}/Logs/latest.log`, err.stack, {}, (error) => {
        if (err) return console.log(`ERROR OCCURED LOGGING CRASH!` + error.stack)
    });

}