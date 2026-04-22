const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Insta-User"
    }
}, { timestamps: true, versionKey: false, })

const PostModel = mongoose.model("Insta-Post", PostSchema)

module.exports = PostModel