const Discord = require('discord.js');
const request = require('request');
const timetodate = require('./../tools/timeToDate.js');


function exeptions(message, config) {
    if ((message.content.startsWith(config.prefix + "comments ") && "comments".length != message.content.length - 2) || "comments".length == message.content.length - 2) {
        let args = message.content.split(' ');
        if (typeof args[1] !== 'undefined') {
            build(message, args, config);
        } else {
            message.channel.send(config.error.acformat + "<@" + message.author.id + ">");
        }
    } else {
        message.channel.send(config.error.space + "<@" + message.author.id + ">");
    }
}

function build(message, args, config) {
    let page = 1;
    let user = args[1].replace(/[^a-zA-Z0-9]+$/, "");
    if (typeof args[2] !== "undefined") {
        page = args[2];
    }
    request(config.host + '/bot/seemessages.php?user=' + user + "&page=" + page, function (error, response, body) {
        if (typeof response !== 'undefined' && response.statusCode < 300) {
            if (error) throw error;
            if (body != "") {
                let info = body.split("~");
                const embed = new Discord.RichEmbed().setColor(config.embedcolors.dark);
                if (info[0] == 0) {
                    let description = "The user you're searching for wasn't found.";
                    embed.setTitle("User wasn't found");
                    if (typeof info[1] !== "undefined" && info[1] != "") {
                        let suggest = info[1].split(",");
                        let people = "";
                        suggest.forEach(function(elem) {
                            people += elem + "\n";
                        });
                        description += "\nBut we did find some people you maybe tried\nto search.";
                        embed
                            .setDescription(description)
                            .addField(config.embedsplit.long, people);
                    } else {
                        embed.setDescription(description);
                    }
                    message.channel.send(embed);
                } else {
                    if (typeof info[1] !== "undefined" && info[1] != "") {
                        let output = info[1].split(";");
                        embed.setTitle(info[0] + "'s account comments page " + page);
                        output.forEach(function(elem) {
                            let person = elem.split(",");
                            let emote = config.emotes.like;
                            let like = person[2]
                            if (like < 0) {
                                emote = config.emotes.dislike;
                                like *= -1;
                            }
                            embed.addField(config.embedsplit.long, "```" + Buffer.from(person[0], 'base64') + "```\nAt " + timetodate.timeConverter(person[1]) + " With " + like + " " + emote);
                        });
                        embed.addField(config.embedsplit.long, "To switch pages use the command format `" + config.prefix + "seemessages [user] [page]`");
                        message.channel.send(embed);
                    } else {
                        if (page == 1) {
                            message.channel.send(config.error.acnon + "<@" + message.author.id + ">");
                        } else {
                            message.channel.send(config.error.acpage + "<@" + message.author.id + ">");
                        }
                    }
                }
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
