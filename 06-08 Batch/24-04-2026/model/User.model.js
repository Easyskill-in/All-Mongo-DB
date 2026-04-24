const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
})

UserSchema.pre("save", async function () {
    console.log("Before saving user");
    if (this.password && this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
});

const UserModel = mongoose.model("My_Easyskill_User", UserSchema)

module.exports = UserModel