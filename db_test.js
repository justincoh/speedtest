const dotenv = require("dotenv");
const { Client } = require("pg");

dotenv.config();

// const text = `INSERT INTO users(timestamp,day_of_week,time,download_mbps,upload_mbps,packet_loss,isp,server_host,server_location,share_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
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
// const testData = [
//     '2023-04-16T20:32:43.000Z',
//     'Sunday',
//     '16:32:43',
//     '527.81',
//     '23.72',
//     '4.76',
//     'Comcast Cable',
//     'speedtest.is.cc',
//     'Secaucus NJ',
//     'https://www.speedtest.net/result/c/19057bee-7d7c-41e9-86c1-fb106f3f4dbd'
// ];

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
