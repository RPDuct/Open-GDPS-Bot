const Discord = require('discord.js');
const request = require('request');
const pixelWidth = require('string-pixel-width');

function exeptions(message, config) {
    if ((message.content.startsWith(config.prefix + "user ") && "user".length != message.content.length - 2) || "user".length == message.content.length - 2) {
        let args = message.content.split(' ');
        if (typeof args[1] !== 'undefined') {
            init(message, args[1], config);
        } else {
            message.channel.send(config.error.usformat + "<@" + message.author.id + ">");
        }
    } else {
        message.channel.send(config.error.space + "<@" + message.author.id + ">");
    }
}

function init(message, user, config) {
    user = user.replace(/[^a-zA-Z0-9]+$/, "");
    if (!isNaN(user)) {
        user = parseInt(user);
    }
    request(config.host + '/bot/user.php?user=' + user, function (error, response, body) {
        if (typeof response !== 'undefined' && response.statusCode < 300) {
            if (error) throw error;
            if (body != "") {
                let user = body.split(",");

                let ban;
                if (user[9] == 0) {
                    ban = user[0] + " is not banned.";
                } else {
                    ban = user[0] + " is banned.";
                }
                let stats = "";
                let emotes = [config.emotes.star, config.emotes.diamond, config.emotes.coin, config.emotes.usercoin, config.emotes.demon, config.emotes.cp];
                for (let i = 3; i <= 8; i++) {
                    while (pixelWidth(user[i], {size: 14}) < 52) {
                        user[i] = " ‌" + user[i];
                    }
                    stats += emotes[i - 3] + "`" + user[i] + "`\n";
                }
                while (pixelWidth(user[13], {size: 14}) < 52) {
                    user[13] = " ‌" + user[13];
                }
                stats += config.emotes.rank + "`" + user[13] + "`\n";
                let links = ["", "", ""];
                let platforms = ["https://www.youtube.com/channel/", "https://www.twitch.tv/", "https://twitter.com/"];
                for (let i = 10; i <= 12; i++) {
                    if (user[i] != "-") {
                        links[i - 10] = "[Open link](" + platforms[i - 10] + user[i] + ")";
                    } else {
                        links[i - 10] = "-";
                    }
                }
                let social = config.emotes.yt + "Youtube: " + links[0] + "\n";
                social += config.emotes.twitch + "Twitch: " + links[1] + "\n";
                social += config.emotes.twitter + "Twitter: " + links[2];
                const userpage = new Discord.RichEmbed()
                    .setColor(config.embedcolors.dark)
                    .setTitle(user[0] + "'s profile")
                    .addField("Ban status", ban)
                    .addField("Stats", stats)
                    .addField(config.embedsplit.short, social)
                    .addField(config.embedsplit.short, "UserID: " + user[1] + ", AccountID: " + user[2] + ".")
                    .setTimestamp();
                message.channel.send(userpage);
            } else {
                message.channel.send(config.error.usinvaliduser + "<@" + message.author.id + ">");
            }
        }
    });
}

module.exports = {
    start: function(message, config) {
        exeptions(message, config)
    }
}