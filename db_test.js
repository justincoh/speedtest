const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config()

const connectDb = async () => {
    console.log("RUNNING QUERY");
    try {
        const client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });

        await client.connect()
        const res = await client.query('SELECT * FROM testing')
        console.log(res)
        await client.end()
    } catch (error) {
        console.log(error)
    }
};

connectDb();