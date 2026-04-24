const mongoose = require("mongoose");
const { MONGODB_URL } = require("./Config");

async function DataBaseConnection() {
    try {
        const conn = await mongoose.connect(MONGODB_URL)
        console.log("Database Connected Successfully...", conn.connection.host)
        return true;
    } catch (error) {

        if (error.name === "MongooseServerSelectionError") {
            console.log("Mongoose Server Selection Error...", error.message);
        } else {
            console.log("DataBase Error : ", error.message)
        }

        process.exit(1)

    }
}


module.exports = DataBaseConnection