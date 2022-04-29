const model = require(`../Models/Cooldown`);

class Cooldown {

    /**
     * 
     * @param {String} member_id 
     * @param {String} type 
     * @param {Number} end 
     */
    constructor(member_id, type, end) {
        this.member_id = member_id;
        this.type = type;
        this.end = end;
    }

    /**
     * 
     * @returns {Promise<*>} Saves the cooldown to the database.
     */
    async save() {
        let cooldownInstance = new model({
            discord_id: this.member_id,
            type: this.type,
            end: this.end
        });

        await cooldownInstance.save().catch(err => console.log(err));
        setTimeout(() => {
            model.findOneAndDelete({
                discord_id: this.member_id,
                type: this.type
            }).catch(err => console.log(err));
        }, this.end - Date.now());

        return cooldownInstance;
    }

}

module.exports = Cooldown