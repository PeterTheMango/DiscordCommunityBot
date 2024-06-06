const {
    model,
    Schema
} = require(`mongoose`);

let notificationSchema = new Schema({
    discord_id: String,
    status: Boolean
});

module.exports = model("Notification", notificationSchema);