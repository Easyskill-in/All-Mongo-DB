const { PORT } = require("../Config/Config");
const app = require("./app");

const connectDB = require("../Config/Db.js")




async function StartServer() {
    try {
        const result = await connectDB()
        if (!result) {
            return;
        }

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.log("Server Starting Error...", error.message)
        process.exit(1);
    }
}


StartServer()