
const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    chat_session_id: String,
    sender_user_id: String,
    message: String,
    timeofmessage: {type: Date, default:Date.now},
    sender_firstName: String,
    sender_lastName: String,
    sender_profile_src:String,
});

const chatMessageModel = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = { chatMessageModel };