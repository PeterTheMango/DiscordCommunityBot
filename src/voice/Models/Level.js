const {
    Schema,
    model
} = require(`mongoose`);

const levelSchema = new Schema({
    discord_id: String,
    xp: Number,
    level: Number,
    time: Number
});

module.exports = model("Level", levelSchema);