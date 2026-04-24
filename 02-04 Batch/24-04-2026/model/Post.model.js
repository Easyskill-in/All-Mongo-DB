const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "INSTA_USER"
    }
})

const PostModel = mongoose.model("INSTA_POST", PostSchema)

module.exports = PostModel