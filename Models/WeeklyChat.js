const {
    Schema,
    model
} = require(`mongoose`);

let weeklySchema = new Schema({
    discord_id: String,
    messages: Number
});

module.exports = model("WeeklyChat", weeklySchema)