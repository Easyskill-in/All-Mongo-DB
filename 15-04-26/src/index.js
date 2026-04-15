const { PORT } = require("../Config/Config");
const app = require("./app");
const DataBaseConnection = require("../Config/Db.js")




async function StartServer() {
    try {
        const result = await DataBaseConnection()
        if (result) {

            app.listen(PORT, () => {
                console.log(`Server running on http://localhost:${PORT}`);
            });
        } else {
            console.log("DataBase Result Error")
        }
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
StartServer()