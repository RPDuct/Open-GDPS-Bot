const Discord = require('discord.js');
const request = require('request');

module.exports = {
    start: function(message, config) {
        let current = require('./../../package.json').version;
        const embed = new Discord.RichEmbed()
            .setColor(config.embedcolors.dark)
            .setTitle("Version info")
            .setDescription("Your version is " + current)
            .setTimestamp();
        request("https://smjs.eu/dibot/getversion.php", function (error, response, body) {
            if (typeof response !== 'undefined' && response.statusCode < 300 && body != "") {
                if (error) throw error;
                if (body != current) {
                    embed.addField(config.embedsplit.long, "You're bot version is outdated. Please install version " + body + " from [the bot repo](https://github.com/SMJSGaming/Open-GDPS-Bot)");
                }
                message.channel.send(embed);
            } else {
                message.channel.send(config.error.pload + "<@" + message.author.id + ">");
            }
        });
    }
}
