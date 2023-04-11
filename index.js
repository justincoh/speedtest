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

const runSpeedtest = () => {
    console.log("Running: ", new Date().toLocaleString())
    exec('speedtest --format=json', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            return;
        }
        
        const result = JSON.parse(stdout);
        const timeStamp = new Date(result.timestamp);
        const hoursMinutesSeconds = `${timeStamp.getHours()}:${timeStamp.getMinutes()}:${timeStamp.getSeconds()}`;
        const downloadSpeed = result.download.bandwidth * BYTE_TO_MBIT;
        const uploadSpeed = result.upload.bandwidth * BYTE_TO_MBIT;

        // add day of weeek?
        const dataToSave = [
            timeStamp.toISOString(),
            DAY_MAP[timeStamp.getDay()],
            hoursMinutesSeconds,
            downloadSpeed.toFixed(2),
            uploadSpeed.toFixed(2),
            result.packetLoss,
            result.isp,
            result.server.host,
            result.server.location.replace(",", ""),
            result.result.url,
        ]
        
        const nextLineOfCsv = dataToSave.join(',');

        addToResults(nextLineOfCsv);
        if (stderr) {
            console.log("error running command: ", stderr);
        } else {
            console.log("Run complete")
        }
    });
};

const addToResults = (stringToEcho) => {
    exec(`echo "\n${stringToEcho}" >> results.csv`, (err, stdout, stderr) => {});
}

// Run on start
runSpeedtest();

// And then run the speedtest every 5 minutes
setInterval(runSpeedtest, 300000);