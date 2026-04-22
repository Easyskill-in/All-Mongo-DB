const express = require('express');
const path = require('path');

const app = express();

const User = require("../model/User.model.js")
const POST = require("../model/Post.model.js")

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.post("/create", async (req, res) => {
    const { username, password, email, age } = req.body;
    try {
        const newUser = new User({
            username,
            password,
            email,
            age
        })

        const data = await newUser.save()

        res.json({
            success: true,
            data
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
})

app.post("/post", async (req, res) => {
    const { title, user } = req.body;
    try {

        const newPost = new POST({
            title,
            user
        })
        const data = await newPost.save()

        res.json({
            success: true,
            data
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
})



app.get("/getpost", async (req, res) => {
    try {
        const data = await POST.find().populate("user", "username -_id")
        res.json({
            success: true,
            data
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
})


module.exports = app