/* eslint-disable valid-jsdoc */
/* eslint-disable no-unused-vars */
const {
	Client
} = require('discord.js');
const path = require('path');
const {
	promisify
} = require('util');
const glob = promisify(require('glob'));
const Command = require('./Command.js');
const Event = require('./Event.js');

module.exports = class Util {

	/**
     * Utility Constructor
     * @param {Client} client
     */
	constructor(client) {
		this.client = client;
	}

	isClass(input) {
		return typeof input === 'function' &&
            typeof input.prototype === 'object' &&
            input.toString().substring(0, 5) === 'class';
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	trimArray(arr, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

	formatBytes(bytes) {
		if (bytes === 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
	}

	removeDuplicates(arr) {
		return [...new Set(arr)];
	}

	capitalise(string) {
		return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');
	}

	async loadCommands() {
		return glob(`${this.directory}Commands/**/*.js`).then(async commands => {
			for (const command of commands) {
				delete require.cache[command];
				const {
					name
				} = path.parse(command);
				const File = require(command);
				if (!this.isClass(File)) throw new TypeError(`${this.capitalise(name)} is not a Command Class!`);
				const CommandInstance = new File(this.client, name.toLowerCase());
				if (!(CommandInstance instanceof Command)) throw new TypeError(`${this.capitalise(name)} does not belong in Commands!`);
				this.client.commands.set(CommandInstance.name, CommandInstance);
				if (CommandInstance.aliases.length) {
					for (const alias of CommandInstance.aliases) {
						this.client.aliases.set(alias, CommandInstance.name);
					}
				}
				console.log(`${this.capitalise(name)} Command has been loaded!`);
			}
		});
	}

	async loadEvents() {
		return glob(`${this.directory}Events/**/*.js`).then(events => {
			for (const event of events) {
				delete require.cache[event];
				const {
					name
				} = path.parse(event);
				const File = require(event);
				if (!this.isClass(File)) throw new TypeError(`${this.capitalise(name)} is not a Event Class!`);
				const EventInstance = new File(this.client, name);
				if (!(EventInstance instanceof Event)) throw new TypeError(`${this.capitalise(name)} does not belong in Events!`);
				this.client.events.set(EventInstance.name, EventInstance);
				EventInstance.emitter[EventInstance.type](name, (...args) => EventInstance.emit(...args));
				console.log(`${this.capitalise(name)} Event has been loaded!`);
			}
		});
	}

};
