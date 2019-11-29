const Discord = require('discord.js');
const request = require('request');


function init(client, config, time) {
    if (config.ratechannel != "") {
        if (typeof client.channels.get(config.ratechannel) !== "undefined") {
            const checkloop = setInterval(function() {
                request(config.host + '/bot/newrate.php?time=' + time, function (error, response, body) {
                    if (typeof response !== 'undefined' && response.statusCode < 300) {
                        if (error) throw error;
                        if (body != "") {
                            build(client, config, body, checkloop);
                        }
                        time = Date.now();
                    }
                });
            }, 10000);
        } else {
            console.log("⚠ Warning! The ratechannel was not found. Rate logging will be skipped.");
        }
    } else {
        console.log("⚠ Warning! No ratechannel ID was found. Rate logging will be skipped.");
    }
}

function build(client, config, output, loop) {
    let rates = output.split(";");

    //I know that I already checked this earlier but this in case the channel gets removed
    if (typeof client.channels.get(config.ratechannel) !== "undefined") {
        rates.forEach(function(element) {
            let array = element.split(",");
            const embed = new Discord.RichEmbed().setColor(config.embedcolors.dark);
            
            if (array[0] == 0) {
                embed.setTitle(array[3] + " unrated " + array[1] + ".")
                    .setDescription("This level was unrated. Sorry to hear that.");
            } else {
                if (array[5] != 0) {
                    embed.setTitle(array[3] + " changed the rating of " + array[1] + ".")
                        .setDescription("The rating of " + array[1] + " has been changed from " + array[5] + config.emotes.star + " to " + array[0] + config.emotes.star + ".")
                } else {
                    embed.setTitle(array[3] + " rated " + array[1] + "!")
                        .setDescription(array[1] + " has been rated to a " + array[0] + config.emotes.star + ".");
                }
                embed.addField("──────────────────────", "The ID is " + array[2] + ".\nHave fun playing!");
            }
            embed.setTimestamp(array[4] * 1000);

            client.channels.get(config.ratechannel).send(embed).catch(err => {
                console.log("⚠ Warning! There was an error sending the rate log.")
            });
        });
    } else {
        clearInterval(loop);
        console.log("⚠ Warning! There was a problem finding the rate channel. The auto rate has been disabled.")
    }
}

module.exports = {
    start: function(client, config, time) {
        init(client, config, time)
    }
}
