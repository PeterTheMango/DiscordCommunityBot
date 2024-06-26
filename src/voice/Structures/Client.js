/*
    GLOBAL VARIABLES
*/
const {
    Client,
    Intents,
    Collection
} = require(`discord.js`);
const Database = require(`../Handlers/Database`);
const Util = require("./Utils");

/*
    Client Specific Configuration
*/

let BotIntents = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_SCHEDULED_EVENTS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_WEBHOOKS];
let client = new Client({
    intents: BotIntents
});

/*
    Client Collections
*/

client.commands = new Collection();
client.events = new Collection();
client.aliases = new Collection();
client.utils = new Util(client)

/**
 * Client Login Function
 * @param {} Config  
 */
async function init(Config) {

    await Database.startDatabase();
    await client.utils.loadEvents();
    await client.login(Config.token);

}

module.exports = {
    init
}