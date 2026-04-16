const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    phone: Number,
    isActive: Boolean,
})

const UserModel = mongoose.model("MYDATA", UserSchema)

module.exports = UserModel