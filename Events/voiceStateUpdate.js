const {
    VoiceState
} = require("discord.js");
const Event = require(`../Structures/Event`);
const Levels = require(`../Handlers/LevelHandler`)

module.exports = class extends Event {

    /**
     * 
     * @param {VoiceState} oldState 
     * @param {VoiceState} newState 
     */
    async emit(oldState, newState) {

        // if (!newState.member) return;

        // if (!newState.channel) {
        //     await Levels.stopTracking(newState.member);
        // } else if (!oldState.channel && newState.channel) {
        //     await Levels.startTracking(newState.member);
        // }

    }

}