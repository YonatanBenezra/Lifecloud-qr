const { Binary } = require('mongodb')
const mongoose = require('mongoose')

const OrganizationProfileSchema = new mongoose.Schema({
    creator: { //the id of the user who created this profile
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    admins: [{ //an array of all the admins of this organization profile
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    wantToBeAdmins:[{ //an array of all the users who request to be admins but are not admins already
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        allowedToBeAdmin: {
            type: Boolean
        }
    }],
    friends: [{ //an array of all the friends of this organization profile
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    wantToBeFriends: [{ //an array of all the profiles who want to be friends but aren't friends already
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile'
        },
        allowedToBeFriend: {
            type: Boolean
        }
    }],
    coverImg: { //cover image of the pofile
        type: Binary
    }, 
    profileImg: { //profile image of the profile organization
        type: Binary
    }, 
    description: { //description of the organization
        type: String
    },

}, {
    timestamps: true
})

OrganizationProfileSchema.pre('save', function(next){
    const orgProfile = this
    for(let i=0; i<orgProfile.wantToBeAdmins.length; i++){
        const adminToBe = orgProfile.wantToBeAdmins[i]
        if(adminToBe.allowedToBeAdmin){
            orgProfile.admins.push(adminToBe.id) //adding the requestor to the admins array
            orgProfile.wantToBeAdmins.pop(adminToBe) //removing the admin from requesting to be an admin
            i-- //the array's length decreases
        }
    }

    for(let j=0; j<orgProfile.wantToBeFriends.length; j++){
        const friendToBe = orgProfile.wantToBeFriends[j]
        if(friendToBe.allowedToBeFriend){
            orgProfile.friends.push(friendToBe.id) //adding the requestor to the friends array
            orgProfile.wantToBeFriends.pop(friendToBe) //removing the friend from requesting to be a friend
            i-- //the array's length decreases 
        }
    }
    next()
})


const OrganizationProfile = mongoose.model('OrgProfile', OrganizationProfileSchema)

module.exports = { OrganizationProfile }