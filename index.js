const { exec } = require('child_process');

const BYTE_TO_MBIT = .000008;

// Map getDay() index to actual day of week
const DAY_MAP = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const hoursMinutesSeconds = (dateObj) => 
    `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;

const runSpeedtest = () => {
    const now = new Date();

    // use stdout so the success log is on the same line as the running log
    process.stdout.write(`Running: ${now.toLocaleString()}`);

    // run the speedtest command line command
    exec('speedtest --format=json', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.log("Node failure, you really shouldn't see this log");
            console.log(err);
            const dataToSave = [
                now.toISOString(), DAY_MAP[now.getDay()], hoursMinutesSeconds(now), 0, 0, 0, "Comcast Cable", "error", "error", "error",
            ];
            addToResults(dataToSave.join(','));
            return;
        }

        if (stderr) {
            console.log("error running command: ", stderr);
            const dataToSave = [
                now.toISOString(), DAY_MAP[now.getDay()], hoursMinutesSeconds(now), 0, 0, 0, "Comcast Cable", "error", "error", "error",
            ];
            addToResults(dataToSave.join(','));
            return;
        }
        
        const result = JSON.parse(stdout);
        const timeStamp = new Date(result.timestamp);
        const downloadSpeed = result.download.bandwidth * BYTE_TO_MBIT;
        const uploadSpeed = result.upload.bandwidth * BYTE_TO_MBIT;

        const dataToSave = [
            timeStamp.toISOString(), // timestamp
            DAY_MAP[timeStamp.getDay()], // day of week
            hoursMinutesSeconds(timeStamp), // HH:MM:SS
            downloadSpeed.toFixed(2), // download speed in Mbits
            uploadSpeed.toFixed(2), // upload speed in Mbits
            result.packetLoss?.toFixed(2), // packet loss
            result.isp, // ISP
            result.server.host, // server host
            result.server.location.replace(",", ""), // location of server
            result.result.url, // link to speedtest result
        ];
        
        // make this all one comma separated string
        const nextLineOfCsv = dataToSave.join(',');

        addToResults(nextLineOfCsv);
        process.stdout.write(" - Done\n");
    });
};

// Append a new line to the existing results csv
const addToResults = (stringToEcho) => {
    exec(`echo "${stringToEcho}" >> results.csv`, (err, stdout, stderr) => {});
}

// Run on start
runSpeedtest();

// And then run the speedtest every 5 minutes
setInterval(runSpeedtest, 300000);