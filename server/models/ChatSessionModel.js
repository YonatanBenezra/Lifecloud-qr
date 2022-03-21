
const mongoose = require('mongoose');

const chatSessionSchema = new mongoose.Schema({
    //chat_session_id: String,
    users:Array,
    userInfo : [{
        id: String,
        firstName: String,
        lastName: String,
        profilePicture: String
      }],
    
    title: String,
    timeofcreation: {type: Date, default:Date.now},
    lastmessage: String, 
    lastupdated: {type: Date, default:Date.now}
});

const chatSessionModel = mongoose.model('ChatSession', chatSessionSchema);

module.exports = { chatSessionModel };