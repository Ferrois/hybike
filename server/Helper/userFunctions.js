const UserSchema = require("../Models/user");

async function returnUserInfo(username) {
    const userInfo = await UserSchema.findOne({username:username}).exec();
    return userInfo;
}

async function updateUserInfo(userInfo){
    const savedUser = await UserSchema.findOneAndUpdate({username: userInfo.username}, userInfo).exec();
    return savedUser;
}

// class UserObject {
//     constructor(username) {
//         this.username = username;
//         this.getInfo(username);
//     }

//     getInfo(username){
//         const userInfo = returnUserInfo(username).then((userInfo) => {
//             this.isAdmin = userInfo.isAdmin;
//             this.points = userInfo.points;
//         });
//     }

//     updateInfo(){
//         console.log(this);
//     }

//     addPoints(points) {
//         this.points += points;
//         this.updateInfo();
//     }
// }

module.exports = {returnUserInfo, updateUserInfo};
