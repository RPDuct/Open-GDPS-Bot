const Discord = require('discord.js');

module.exports = {
    start: function(message, config) {
        const embed = new Discord.RichEmbed()
            .setTitle("Bot License")
            .setDescription(config.license)
            .addField("Creator", "SMJS")
        message.channel.send(embed);
    }
}