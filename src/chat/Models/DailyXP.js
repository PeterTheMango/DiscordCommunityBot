const {
    Schema,
    model
} = require(`mongoose`);

let dailySchema = new Schema({
    discord_id: String,
    xp: Number,
});

module.exports = model("DailyXP", dailySchema)