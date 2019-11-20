const Discord = require('discord.js');
const command = require('./commandHandle.js')
const rate = require('./bg/fetchrate.js');
const con = require('./config.json');
const process = require("process");
const request = require('request');
const client = new Discord.Client();
let config;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log("Pid: " + process.pid);
    console.log("Ppid: " + process.ppid);
    let time = Date.now();
    console.log("Boot timestamp: " + time);

    if (con.ratechannel != "") {
        const interval = setInterval(function() {
            rate.start(client, config, time);
            time = Date.now();
        }, 10000);
    }
});
client.on('message', message => {
    if (typeof config !== 'undefined') {
        if (message.author.bot) return;
        if (message.content.startsWith(config.prefix)) {
            command.checkcommand(message, client, config);
        }
    }
});

request("https://smjs.eu/dibot/jsoninfo.php?host=" + con.host, function (error, response, body) {
    if (error) throw error;
    if (body == "") {
        process.exit(0);
    } else {
        config = Object.assign({}, con, JSON.parse(body));
        client.login(con.token);
    }
});