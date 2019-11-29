const Discord = require('discord.js');
const request = require('request');
const pixelWidth = require('string-pixel-width');


function exeptions(message, config) {
    if ((message.content.startsWith(config.prefix + "leaderboard ") && "leaderboard".length - 2 != message.content.length) || "leaderboard".length == message.content.length - 2) {
        let args = message.content.split(' ');
        if (typeof args[1] !== 'undefined') {
            if (!isNaN(args[1]) && args[1] < 2147483647 && args[1] >= 1) {
                build(message, args[1], false, config);
            } else if (args[1] == "creator") {
                if (typeof args[2] !== 'undefined') {
                    if (!isNaN(args[2])) {
                        build(message, args[2], true, config);
                    } else {
                        message.channel.send(config.error.lbinvalidnum + "<@" + message.author.id + ">");
                    }
                } else {
                    message.channel.send(config.error.lbinvalidnum + "<@" + message.author.id + ">");
                }
            } else {
                message.channel.send(config.error.lbformat + "<@" + message.author.id + ">");
            }
        } else {
            message.channel.send(config.error.lbformat + "<@" + message.author.id + ">");
        }
    } else {
        message.channel.send(config.error.space + "<@" + message.author.id + ">");
    }
}

function build(message, page, creator, config) {
    let type;
    page--;
    if (creator) {
        type = "&type=creator";
    } else {
        type = "&type=stars";
    }
    request(config.host + '/bot/boards.php?bot=true&page=' + page + type, function (error, response, body) {
        if (typeof response !== 'undefined' && response.statusCode < 300) {
            if (error) throw error;
            if (body != "") {
                let people = body.split(";");
                let output = "";
                let spot = page * 20 + 1;
                let firstspot = spot;
                let emoji;
                let commanduse = "Use `" + config.prefix + "leaderboard ";
                people.forEach(function(elem) {
                    let person = elem.split(",");
                    let extra = "";
                    let extracount = "";
                    if (firstspot.toString().length != (20 + firstspot).toString().length) {
                        for (let i = firstspot.toString().length; i >= spot.toString().length; i--) {
                            extra += " ‌";
                        }
                    }
                    while (pixelWidth(extracount, {size: 14}) + pixelWidth(person[1], {size: 14}) < 75) {
                        extracount += " ‌";
                    }
                    if (creator) {
                        emoji = config.emotes.cp;
                    } else {
                        emoji = config.emotes.star;
                    }
                    output += "`#" + extra + spot + "`|" + emoji + "`" + extracount + person[1] + "`| " + person[0] + "\n";
                    spot++;
                });
                if (creator) {
                    commanduse += "[page]` to get\nthe player leaderboards.";
                } else {
                    commanduse += "creator [page]`\nto get the creator leaderboards.";
                }
                page++;
                const leaderboards = new Discord.RichEmbed()
                    .setColor(config.embedcolors.dark)
                    .setTitle("2.2 leaderboards")
                    .setDescription("**page " + page + "**\n\n" + output)
                    .addField(config.embedsplit.mid, commanduse)
                    .setTimestamp();
                message.channel.send(leaderboards);
            } else {
                message.channel.send(config.error.invalidpage + "<@" + message.author.id + ">");
            }
        } else {
            message.channel.send(config.error.pload + "<@" + message.author.id + ">");
        }
    });
}

module.exports = {
    start: function(message, config) {
        exeptions(message, config)
    }
}
