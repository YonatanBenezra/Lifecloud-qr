const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

var chatMessageSchema = new mongoose.Schema({
    id: Int32,
    user_one_id: Int32,
    user_two_id: Int32,
    message: String,
    timeofmessage: {type: Date, default:Date.now},
    action_user_id: Int32

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