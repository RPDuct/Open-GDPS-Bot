const process = require("process");
const help = require('./commands/help.js');
const leaderboard = require('./commands/leaderboard.js');
const license = require('./commands/license.js');
const userfetch = require('./commands/userfetch.js');
const comments = require('./commands/comments.js');
const level = require('./commands/seelevel.js');
const kill = require('./commands/owner/kill.js');
const reboot = require('./commands/owner/reboot.js');

module.exports = {
    checkcommand: function(message, client, config) {
        switch (message.content.split(config.prefix)[1]) {
            case "test":
                if (message.author.id == config.ownerid) {
                    message.channel.send("I work!");
                } else {
                    message.channel.send(config.error.owner + "<@" + message.author.id + ">");
                }
                break;
            case "license":
                license.start(message, config);
                break;
            case "kill":
                kill.start(message, process, config);
                break;
            case "reboot":
                reboot.start(message, client, config);
                break;
        }
        if (message.content.startsWith(config.prefix + "leaderboard")) {
            leaderboard.start(message, config);
        }
        if (message.content.startsWith(config.prefix + "help")) {
            help.start(message, config);
        }
        if (message.content.startsWith(config.prefix + "user")) {
            userfetch.start(message, config);
        }
        if (message.content.startsWith(config.prefix + "comments")) {
            comments.start(message, config);
        }
        if (message.content.startsWith(config.prefix + "level")) {
            level.start(message, config);
        }
    }
};