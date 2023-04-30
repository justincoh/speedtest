const dotenv = require("dotenv");
const { Client } = require("pg");

dotenv.config();

const sql = `INSERT INTO results (
    timestamp,
    day_of_week,time,
    download_mbps,
    upload_mbps,
    packet_loss,
    isp,
    server_host,
    server_location,
    share_url
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;

const writeValues = async (values) => {
    try {
        const client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });

        await client.connect()
        await client.query(sql, values);
        await client.end()
    } catch (error) {
        console.log(error)
    }
};

module.exports = { writeValues };
