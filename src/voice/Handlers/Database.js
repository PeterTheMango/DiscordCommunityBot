const database_instance = require(`mongoose`);
const colors = require('colors');
const {
    database
} = require(`../Assets/Config.json`);

let connection = `mongodb://${database.username}:${database.password}@${database.host}:${database.port}/discord_bot?authSource=admin`;

async function startDatabase() {
    await console.log(`\n\n\nTrying to connect to remote database at ${connection}.\n\n\n`.yellow);
    await database_instance.connect(connection)
        .then(async () => {
            console.log(`\n\n\nConnected to database at ${connection}!\n\n\n`.green);
        })
        .catch(async err => {
            console.log(`\n\n\nError connecting to database at ${connection}! Read Error Found Below!\n\n`.red);
            throw err
        });
}

/**
 * 
 * @returns The active database that the bot is connected to.
 */
function getDatabase() {
    return database_instance;
}

module.exports = {
    startDatabase,
    getDatabase
}