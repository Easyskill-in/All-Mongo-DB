const express = require('express');
const path = require('path');

const app = express();

const bcrypt = require('bcrypt');

const User = require("../model/User.model.js")
const POST = require("../model/Post.model.js")

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.post('/register', async (req, res) => {

    const { username, email, password } = req.body;
    try {


        const newUser = new User({
            username,
            email,
            password
        })

        const data = await newUser.save()

        console.log(data)

        res.status(201).json({
            success: true,
            data
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


})
// app.post('/register', async (req, res) => {

//     const { username, email, password } = req.body;
//     try {

//         const hasedPassword = await bcrypt.hash(password, 10)

//         console.log({ password, hasedPassword })

//         const newUser = new User({
//             username,
//             email,
//             password: hasedPassword
//         })

//         const data = await newUser.save()

//         console.log(data)

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }


// })

app.post("/login", async (req, res) => {

    const { username, password } = req.body;
    try {

        const MyUser = await User.findOne({ username })

        if (!MyUser) {
            return res.json({
                success: false,
                message: "User Not Found"
            })
        }

        const isValid = await bcrypt.compare(password, MyUser.password)

        console.log(isValid)

        if (!isValid) {
            return res.json({
                success: false,
                message: "Invalid Password..."
            })
        }

        res.json({
            success: true,
            data: MyUser
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = app