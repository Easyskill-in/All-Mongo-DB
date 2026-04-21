const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username:
        { type: String, required: true },
    email:
        { type: String, lowercase: true, unique: true, trim: true },

    password:
        { type: String, default: "user@123", minlength: 6 },
    age:
        { type: Number, min: 18, max: 90 },
    address: {
        city: String,
        state: String,
        pincode: Number,
    },
    arr: [String]
}, { timestamps: true })

const UserModel = mongoose.model("Easyskills", UserSchema)

module.exports = UserModel