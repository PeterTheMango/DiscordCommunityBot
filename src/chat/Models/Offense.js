const {
    Schema,
    model
} = require(`mongoose`);

const offenseSchema = new Schema({
    discord_id: String,
    type: String,
    reason: String,
    moderator: String,
    date: Date
});

module.exports = model("Offense", offenseSchema);