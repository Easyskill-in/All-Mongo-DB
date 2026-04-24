const express = require('express');
const path = require('path');

const bcrypt = require("bcrypt")

const app = express();

const User = require("../model/User.model.js")
const POST = require("../model/Post.model.js")

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post("/register", async (req, res) => {
    const { username, email, password, age } = req.body;
    try {
        // const arr = [username, email, password, age]
        // if (arr.some(field => field.trim() === "")) {
        if (username.trim() === "" || email.trim() === "" || password.trim() === "" || !age) {

            return res.status(400).json({ message: "All fields are required" })
        }



        const newUser = new User({
            username,
            email,
            password,
            age
        })

        const data = await newUser.save()

        res.status(201).json({
            success: true,
            data,
        })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error.message })
    }

})


// app.post("/register", async (req, res) => {
//     const { username, email, password, age } = req.body;
//     try {
//         // const arr = [username, email, password, age]
//         // if (arr.some(field => field.trim() === "")) {
//         if (username.trim() === "" || email.trim() === "" || password.trim() === "" || !age) {

//             return res.status(400).json({ message: "All fields are required" })
//         }

//         const hashedPassword = await bcrypt.hash(password, 10)

//         console.log({ hashedPassword })


//         const newUser = new User({
//             username,
//             email,
//             password: hashedPassword,
//             age
//         })

//         const data = await newUser.save()


//         const result = await bcrypt.compare("x", hashedPassword)

//         res.status(201).json({
//             success: true,
//             data,
//             result
//         })

//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error " + error.message })
//     }

// })


app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        // const arr = [username, email, password, age]
        // if (arr.some(field => field.trim() === "")) {
        if (username.trim() === "" || password.trim() === "") {

            return res.status(400).json({ message: "All fields are required" })
        }



        const MyUser = await User.findOne({ username })

        console.log(await MyUser.comparePassword(password))


        if (!MyUser) {
            return res.status(400).json({ message: "No User Found" })
        }

        // const result = await bcrypt.compare(password, MyUser.password)

        const result = await MyUser.comparePassword(password)

        if (!result) {
            return res.status(400).json({ message: "Invalid Password" })
        }

        res.status(200).json({
            success: true,
            message: "User Login Successfully....",
            MyUser
        })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error.message })
    }
})

module.exports = app