CREATE TABLE IF NOT EXISTS results (
    id SERIAL NOT NULL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL UNIQUE,
    day_of_week VARCHAR(9) NOT NULL,
    time VARCHAR(8) NOT NULL,
    download_mbps FLOAT NOT NULL,
    upload_mbps FLOAT NOT NULL,
    packet_loss FLOAT,
    isp VARCHAR(50),
    server_host VARCHAR(100),
    server_location VARCHAR(100),
    share_url VARCHAR(100)
);
