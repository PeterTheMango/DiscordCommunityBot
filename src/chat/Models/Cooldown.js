const {
    Schema,
    model
} = require(`mongoose`);

const cooldownSchema = new Schema({
    discord_id: String,
    type: String,
    end: Number
});

module.exports = model("Cooldown", cooldownSchema);