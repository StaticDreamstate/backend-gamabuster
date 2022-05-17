const Sequelize = require("sequelize");

const DB_NAME = "gamabuster";
const DB_USER = "root";
const DB_PASS = "none";
const DB_CONFIG = {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
};

let db = {};

try {
    db = new Sequelize (DB_NAME, DB_USER, DB_PASS, DB_CONFIG);
} catch (error) {
    console.error("Connection refused: ", error.message);
};

const hasConnection = async () => {
    try {
        await db.authenticate();
        console.log("Connected [OK].")
    } catch (error) {
        console.error("Connection refused: ", error.message);
    }
    
};
Object.assign(db, {hasConnection});
module.exports = db;