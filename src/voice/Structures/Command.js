const {
    Client
} = require("discord.js");

module.exports = class Command {
    /**
     * 
     * @param {Client} client 
     * @param {String} name 
     * @param {Object} options 
     */
    constructor(client, name, options = {}) {
        this.client = client;
        this.name = options.name || name;
        this.description = options.description || "No Description Provided!";
        this.category = options.category || "Uncategorized";
        this.usage = options.usage || "No Usage Provided!";
        this.aliases = options.aliases || [];
    };

    async execute(message, args) {
        throw new Error(`${this.name} Command does not provide a execute method!`);
    }
}