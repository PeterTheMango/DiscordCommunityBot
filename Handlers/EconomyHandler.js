/*
    Database Models
*/

const {
    TextChannel
} = require("discord.js");
const Balance = require(`../Models/Balance`);

/*
    Leaderboard Holder
    {
        discord_id: String,
        amount: Number
    }

    reset every 12 am system time.
    updates every 5 minutes

*/

/**
 * 
 * @param {TextChannel} channel 
 * @returns The leaderboard message data.
 */
async function generateLeaderboard(channel) {

}

/**
 * Restarts timers for all leaderboard updates as well as reset the local variables
 */
async function startLeaderboards() {

}

/**
 * @param {String} user_id 
 * @returns The Database object that contains the users data.
 */
async function getBalance(user_id) {
    let userBalance = await Balance.findOne({
        discord_id: user_id
    });
    if (!userBalance) {
        let createBalance = new Balance({
            discord_id: user_id,
            wallet: 0,
            stored: 0,
        });
        createBalance.save().catch(err => console.log(err));
        userBalance = createBalance;
    }
    return userBalance;
}

/**
 * 
 * @param {String} user_id 
 * @param {Number} new_wallet
 * @param {Number} new_stored
 * @returns The updated Database Object.
 */
async function updateBalance(user_id, new_wallet, new_stored) {

    await getBalance(user_id);

    let updatedBalance = await Balance.findOneAndUpdate({
        discord_id: user_id
    }, {
        discord_id: user_id,
        wallet: new_wallet,
        stored: new_stored
    });
    return updatedBalance;
}

module.exports = {
    getBalance,
    updateBalance
}