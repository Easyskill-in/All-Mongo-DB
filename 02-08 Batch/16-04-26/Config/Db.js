const mongoose = require("mongoose");
const { MONGO_URI } = require("./Config");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI)
        console.log("Database Connected SuccessFully...", conn.connection.host)
        return true
    } catch (error) {
        if (error.name === "MongooseServerSelectionError") {
            console.log("Check DataBase Connection URL\n", error.message)
        } else {
            console.log("database Connection Error : ", error)
        }
        process.exit(1);
        return false
    }
}

module.exports = connectDB
