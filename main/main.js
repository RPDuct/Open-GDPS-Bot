const Discord = require('discord.js');
const client = new Discord.Client();

//making the config
require('./bg/construct-config.js').build.then(function(config) {
    //logging in
    client.login(config.token);

    //doing some stuff after being logged in
    client.on('ready', () => {
        //giving some details about this session
        console.log("Logged in as " + client.user.tag);
        console.log("Pid: " + process.pid);
        console.log("Ppid: " + process.ppid);
        let time = Date.now();
        console.log("Boot timestamp: " + time);

        //start the rate check interval
        require('./bg/fetchrate.js').start(client, config, time);
    });

    //trigger the command handle on message
    client.on('message', message => {
        require('./commandHandle.js').handle(message, client);
    });
});
