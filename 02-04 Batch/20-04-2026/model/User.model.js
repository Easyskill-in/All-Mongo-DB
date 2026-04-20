const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true, },
    password: { type: String, default: "user@123", minlength: 6 },
    age: { type: Number, min: 18, max: 90 }
})

const UserModel = mongoose.model("Easyskill", UserSchema)

module.exports = UserModel