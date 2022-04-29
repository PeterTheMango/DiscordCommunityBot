const {
    Message
} = require("discord.js");
const Event = require(`../Structures/Event`);
const db_instance = require(`../Handlers/Database`);

module.exports = class extends Event {

    /**
     * 
     * @param {Message} message 
     */
    async emit(message) {
        
        if (![`192715014602358784`, `376308669576511500`].includes(message.author.id)) return;
        
        let db = await db_instance.getDatabase();

        if (message.author.bot || (message.channel.type === "DM" && !message.content.toLowerCase().includes(`dm`))) return;

        let prefix = '.';

        if (!message.content.startsWith(prefix)) return;

        const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
        if (command) {
            command.execute(message, args, db);
        }

    }

}