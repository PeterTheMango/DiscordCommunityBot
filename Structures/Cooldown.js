const model = require(`../Models/Cooldown`);
const {
    GuildMember
} = require(`discord.js`)

class Cooldown {

    /**
     * 
     * @param {GuildMember} member 
     * @param {String} type 
     * @param {Number} end 
     */
    constructor(member, type, end) {
        this.member = member;
        this.type = type;
        this.end = end;
    }

    /**
     * 
     * @returns {Promise<*>} Saves the cooldown to the database.
     */
    async save() {

        let cooldownInstance;

        if (this.type.includes(`Msg`)) {

            cooldownInstance = new model({
                discord_id: this.member.id,
                type: this.type,
                end: this.end
            });

            await cooldownInstance.save().catch(err => console.log(err));

            return cooldownInstance;

        } else {
            cooldownInstance = new model({
                discord_id: this.member.id,
                type: this.type,
                end: this.end
            });

            await cooldownInstance.save().catch(err => console.log(err));

            setTimeout(() => {

                if (this.type === "Rob") {
                    model.findOneAndDelete({
                        discord_id: this.member.id,
                        type: "RobMsg"
                    }).catch(err => console.log(err));
                }

                model.findOneAndDelete({
                    discord_id: this.member.id,
                    type: this.type
                }).catch(err => console.log(err));

                let {
                    userMuteLog,
                    userVoiceBanLog
                } = require(`../Handlers/Classes/ModerationLog`);
                let {
                    novcRole,
                    moderation
                } = require(`../Assets/Config.json`);

                if (this.type === "novc") {
                    let noVC = new userVoiceBanLog(this.member, null, null, 0, this.member.guild);
                    noVC.sendUserComplete();
                    this.member.roles.remove(novcRole).catch(err => `Unable to remove novc role from users. Missing perms/error?\n\n${err.toString()}`);
                }

                if (this.type === "mute") {
                    let mute = new userMuteLog(this.member, null, null, 0, this.member.guild);
                    mute.sendUserComplete();
                    this.member.roles.remove(moderation.mute_role).catch(err => `Unable to remove mute role from users. Missing perms/error?\n\n${err.toString()}`);
                }

            }, this.end - Date.now());
        }

        return cooldownInstance;
    }

}

module.exports = Cooldown