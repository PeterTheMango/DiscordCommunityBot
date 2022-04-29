const {
    Schema,
    model
} = require(`mongoose`);

const balanceSchema = new Schema({
    discord_id: String,
    wallet: Number,
    stored: Number
});

module.exports = model("Balance", balanceSchema);