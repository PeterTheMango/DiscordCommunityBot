const Event = require(`../Structures/Event`);
const figlet = require(`util`).promisify(require('figlet'));
const colors = require(`colors`);
const {
    startTrackingExisting,
    startLeaderboards
} = require(`../Handlers/LevelHandler`)
const Cooldowns = require(`../Handlers/CooldownHandler`);

module.exports = class extends Event {

    async emit() {
        let bot_name = await figlet('Mika');
        console.log(`${bot_name}\n| Created By: Peter S.#0023`.cyan);

        await this.client.user.setPresence({
            status: 'idle',
            activities: [{
                name: "I am under maintenance! #support for help."
            }]
        });
        await this.client.user.setStatus(`idle`);

        let guild = this.client.guilds.cache.get(`727649662475173962`);
        if (guild) {
            await startLeaderboards(guild);
            await Cooldowns.registerUserCooldowns();
        }

        console.log(`\n\nBot Has Been Started!\n\n`);

    }

}