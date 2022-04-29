const {
    Schema,
    model
} = require(`mongoose`);

let leaderboardSchema = new Schema({
    channel_id: String,
    guild_id: String,
    message_id: String,
    type: String
});

module.exports = model("Leaderboard", leaderboardSchema);