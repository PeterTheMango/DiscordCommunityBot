const {
    Schema,
    model
} = require(`mongoose`);

let weeklySchema = new Schema({
    discord_id: String,
    xp: Number,
    time: Number
});

module.exports = model("WeeklyXP", weeklySchema)