module.exports = {
    handle: function(message, client) {
        require('./bg/construct-config.js').build.then(function(config) {
            if (typeof config !== 'undefined') {
                if (message.author.bot) return;
                if (message.content.startsWith(config.prefix)) {
                    switch (message.content.split(config.prefix)[1]) {
                        case "test":
                            if (message.author.id == config.ownerid) {
                                message.channel.send("I work!");
                            } else {
                                message.channel.send(config.error.owner + "<@" + message.author.id + ">");
                            }
                            break;
                        case "license":
                            require('./commands/license.js').start(message, config);
                            break;
                        case "kill":
                            require('./commands/owner/kill.js').start(message, process, config);
                            break;
                        case "reboot":
                            require('./commands/owner/reboot.js').start(message, client, config);
                            break;
                        case "version":
                            require('./commands/owner/versioncheck.js').start(message, config);
                            break;
                    }
                    if (message.content.startsWith(config.prefix + "leaderboard")) {
                        require('./commands/leaderboard.js').start(message, config);
                    }
                    if (message.content.startsWith(config.prefix + "help")) {
                        require('./commands/help.js').start(message, config);
                    }
                    if (message.content.startsWith(config.prefix + "user")) {
                        require('./commands/userfetch.js').start(message, config);
                    }
                    if (message.content.startsWith(config.prefix + "comments")) {
                        require('./commands/comments.js').start(message, config);
                    }
                    if (message.content.startsWith(config.prefix + "level")) {
                        require('./commands/seelevel.js').start(message, config);
                    }
                }
            } else {
                message.channel.send(config.error.pload + "<@" + message.author.id + ">");
            }
        });
    }
}
