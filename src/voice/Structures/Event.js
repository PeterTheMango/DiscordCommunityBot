const { Client } = require("discord.js");

module.exports = class Event {

    /**
     * 
     * @param {Client} client 
     * @param {String} name 
     * @param {Object} options 
     */
	constructor(client, name, options = {}) {
		this.name = name;
		this.client = client;
		this.type = options.once ? 'once' : 'on';
		this.emitter = (typeof options.emitter === 'string' ? this.client[options.emitter] : options.emitter) || this.client;
	}

	async emit(...args) {
		throw new Error(`${this.name} Event does not contain a emit method.`);
	}

};