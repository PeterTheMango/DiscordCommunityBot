const {
    startTrackingExisting
} = require('../Handlers/LevelHandler');
const Event = require(`../Structures/Event`);
const figlet = require(`util`).promisify(require('figlet'));

module.exports = class extends Event {

    async emit() {
        console.log(await figlet('MIKA VOICE') + `\n| Created By: Peter S.#0023`);

        let guild = this.client.guilds.cache.get(`727649662475173962`);
        if (guild) {
            await startTrackingExisting(guild);
        }

        console.log(`\n\nBot Has Been Started!\n\n`);


    }

}