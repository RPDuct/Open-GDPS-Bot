const Discord = require('discord.js');
const request = require('request');


function exeptions(message, config) {
    if ((message.content.startsWith(config.prefix + "level ") && "level".length != message.content.length - 2) || "level".length == message.content.length - 2) {
        let args = message.content.split(' ');
        if (typeof args[1] !== 'undefined') {
                let level = "";
                for (let i = 1; i < args.length; i++) {
                    level += " " + args[i];
                }
                init(level.substr(1), message, config);
        } else {
            message.channel.send(config.error.acformat + "<@" + message.author.id + ">");
        }
    } else {
        message.channel.send(config.error.space + "<@" + message.author.id + ">");
    }
}

function init(level, message, config) {
    let anlevel = level.replace(/[^a-zA-Z0-9\s!?]+$/, "");
    request(config.host + '/bot/levels.php?levelname=' + anlevel, function (error, response, body) {
        if (typeof response !== 'undefined' && response.statusCode < 300) {
            if (error) throw error;
            if (body != "") {
                let output = "";
                let data = body.split(":");
                const embed = new Discord.RichEmbed();
                if (data[0] == "0") {
                    let suggestions = data[1].split(";");
                    let desc = "We couldn't find this level.";
                    if (suggestions[0] != "") {
                        for (let i = 0; i < suggestions.length; i++) {
                            output += suggestions[i] + "\n";
                        }
                    }
                    if (output != "") {
                        desc += " But we do have some levels you maybe tried to search.";
                    }
                    embed
                        .setTitle("This level wasn't found.")
                        .setDescription(desc)
                        .addField(config.embedsplit.short, output);
                } else {
                    let info = data[1].split("~");
                    let coins = "";
                    let star = "none";
                    let levelbadges = " ";
                    let time;
                    let rateinfo = "This level isn't rated.";
                    if (info[10] != 0) {
                        star = info[10] + config.emotes.star;
                    }
                    for (let i = 0; i < info[6]; i++) {
                        coins += config.emotes.usercoin;
                    }
                    if (coins != "") {
                        coins = " | " + coins;
                    }
                    if (info[9] != 0) {
                        levelbadges += config.emotes.collab;
                    }
                    if (parseInt(info[2]) >= 40000) {
                        levelbadges += config.emotes.highobj;
                    }
                    if (levelbadges == " ") {
                        levelbadges = "";
                    }
                    switch(parseInt(info[4])) {
                        case 0:
                            time = "Tiny";
                            break;
                        case 1:
                            time = "Short";
                            break;
                        case 2:
                            time = "Medium";
                            break;
                        case 3:
                            time = "Long";
                            break;
                        case 4:
                            time = "XL";
                            break;
                        default:
                            time = "Bruh?";
                            break;
                    }
                    
                    if (info[12] == 1) {
                        rateinfo = "This level is an epic and has a rating of " + info[10] + config.emotes.star + ".";
                    } else if (info[11] == 1) {
                        rateinfo = "This level is featured and has a rating of " + info[10] + config.emotes.star + ".";
                    } else if (info[10] != 0) {
                        rateinfo = "This level has a rating of " + info[10] + config.emotes.star + ".";
                    }
                    embed
                        .setTitle(data[0] + levelbadges + " by " + info[5])
                        .setDescription(Buffer.from(info[1], 'base64'))
                        .addField("Stats", config.emotes.downloads + info[7] + " | " + config.emotes.like + info[8] + " | " + config.emotes.time + time)
                        .addField("Collectables", star + coins)
                        .addField("Rating", rateinfo)
                        .setFooter("Version " + info[3] + ", ID " + info[0])
                        .setTimestamp(parseInt(info[13]) * 1000);
                }
                message.channel.send(embed);
            }
        } else {
            message.channel.send(config.error.pload + "<@" + message.author.id + ">");
        }
    });
}

module.exports = {
    start: function(message, config) {
        exeptions(message, config);
    }
}
