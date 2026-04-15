const express = require('express');
const path = require('path');

const app = express();

const User = require("../model/User.model.js")

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', async (req, res) => {
    try {
        // const data = await User.create({
        //     username: "A",
        //     password: "A",
        //     email: "A@A",
        //     age: 15
        // })

        // ------------------

        const newUser = new User({
            username: "B",
            password: "B",
            email: "mail.com",
            age: 99
        })

        const data = await newUser.save()

        newUser.age = 101;

        newUser.save()

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
});


app.get("/read", async (req, res) => {
    try {
        const allData =
            await User.findOne({ age: 15, username: "A" }).select("-password -_id -__v")
        // await User.findOne({ age: 15, username: "A" }).select("username email")

        return res.json({
            success: true,
            data: allData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
})

module.exports = app