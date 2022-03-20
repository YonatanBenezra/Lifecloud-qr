
const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    user_one_id: String,
    user_two_id: String,
    message: String,
    timeofmessage: {type: Date, default:Date.now},
    action_user_id: Number

    /*
    chatUserIDs: String,
    senderID: Int16Array,
    recipientID: Int16Array,
    senderUsername: String,
    recepientUsername: String,
    contents: String,
    dateCreated: {type: Date, default:Date.now}*/

});

const chatMessageModel = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = { chatMessageModel };