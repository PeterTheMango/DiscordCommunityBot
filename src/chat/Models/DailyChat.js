const {
    Schema,
    model
} = require(`mongoose`);

let dailySchema = new Schema({
    discord_id: String,
    messages: Number,
});

module.exports = model("DailyChat", dailySchema)