const orgProfile = {
    wantToBeAdmins: [{
        allowedToBeAdmin: false,
        id: '1234567'
    },
    {
        allowedToBeAdmin: true,
        id: '12345678'
    }],
    admins: []
}

for(let i=0; i<orgProfile.wantToBeAdmins.length; i++){
    console.log('loop')
    const adminToBe = orgProfile.wantToBeAdmins[i]
    if(adminToBe.allowedToBeAdmin){
        orgProfile.admins.push(adminToBe.id)
        orgProfile.wantToBeAdmins.pop(adminToBe) 
        i --
    }
}

// while(orgProfile.wantToBeAdmins.length != 0){
//     console.log('loop')
//     const adminToBe = orgProfile.wantToBeAdmins[0]
// }

console.log(orgProfile)