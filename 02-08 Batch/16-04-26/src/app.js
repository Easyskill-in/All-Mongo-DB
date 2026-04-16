const express = require('express');
const path = require('path');

const app = express();
const UserModel = require("../model/user.model.js")
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', async (req, res) => {
    try {
        const data = await UserModel.create({
            username: "MyName",
            password: "MyPassword",
            phone: 9658647521,
            isActive: true
        })
        res.json({
            success: true,
            data
        })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
});


app.post('/', async (req, res) => {
    const { username, password, phone, isActive } = req.body
    try {
        const data = await UserModel.create({
            username,
            password,
            phone,
            isActive,
        })
        res.json({
            success: true,
            data
        })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
});


app.get("/all", async (req, res) => {
    try {
        const data = await UserModel.findOne({ username: "User", isActive: false })
        res.json({
            success: true,
            data
        })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
})

module.exports = app;