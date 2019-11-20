const request = require('request');
const process = require("process");

export default async function start(config) {
    request("https://smjs.eu/dibot/jsoninfo.php?host=" + config.host, function (error, response, body) {
        if (error) throw error;
        if (body == "") {
            process.exit(0);
        } else {
            return JSON.parse(body);
        }
    });
}