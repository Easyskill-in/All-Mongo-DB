const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true, required: true },
    password: { type: String, required: true, minlength: 6 },
    age: { type: Number, min: 18, max: 90, required: true },
},
    { versionKey: false, timestamps: true })



UserSchema.pre("save", async function () {
    if (this.isModified("password")) {
        console.log("Hashing password...");
        this.password = await bcrypt.hash(this.password, 10);
    }
});

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// UserSchema.pre("save", async function () {
//     await (async () => {
//         if (this.password && !(this.isModified("password"))) {
//             console.log("Yesssss..")
//             this.password = await bcrypt.hash(this.password, 10)
//         }

//     })();
// });


const UserModel = mongoose.model("Easyskill_User", UserSchema)
module.exports = UserModel