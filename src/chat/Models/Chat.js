const {
    Schema,
    model
} = require(`mongoose`);

const chatSchema = new Schema({
    discord_id: String,
    messages: Number,
    reward_messages: Number,
});

module.exports = model("Chat", chatSchema);