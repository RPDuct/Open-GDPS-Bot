const Discord = require('discord.js');
const request = require('request');


function init(client, config, time) {
    request(config.host + '/bot/newrate.php?time=' + time, function (error, response, body) {
        if (response.statusCode < 300) {
            if (error) throw error;
            if (body != "") {
                build(client, config, body);
            }
        }
    });
}

function build(client, config, output) {
    let rates = output.split(";");
    rates.forEach(function(element) {
        let array = element.split(",");
        const embed = new Discord.RichEmbed().setColor(config.embedcolors.dark);
        if (array[0] == 0) {
            embed.setTitle(array[3] + " unrated " + array[1] + ".")
                .setDescription("This level was unrated. Sorry to hear that.")
        } else if (array[5] != 0) {
            embed.setTitle(array[3] + " changed the rating of " + array[1] + ".")
                .setDescription("The rating of " + array[1] + " has been changed from " + array[5] + config.emotes.star + " to " + array[0] + config.emotes.star + ".")
                .addField("──────────────────────", "The ID is " + array[2] + ".\nHave fun playing!")
        } else {
            embed.setTitle(array[3] + " rated " + array[1] + "!")
                .setDescription(array[1] + " has been rated to a " + array[0] + config.emotes.star + ".")
                .addField("──────────────────────", "The ID is " + array[2] + ".\nHave fun playing!")
        }
        embed.setTimestamp(parseInt(array[4]) * 1000);
        const target = client.channels.get(config.ratechannel);
        if (typeof target !== "undefined") {
            target.send(embed).catch(err => {
                console.log("There was an error sending the rate log.")
            });
        }
    });
}

module.exports = {
    start: function(client, config, time) {
        init(client, config, time)
    }
}