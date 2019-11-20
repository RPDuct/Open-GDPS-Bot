const Discord = require('discord.js');


function exceptions(message, config) {
    if ((message.content.startsWith(config.prefix + "help ") && "help".length != message.content.length - 2) || "help".length == message.content.length - 2) {
        let args = message.content.split(' ');
        if (typeof args[1] !== 'undefined') {
            init(args[1], message, config);
        } else {
            init("default", message, config);
        }
    } else {
        message.channel.send(config.error.space + "<@" + message.author.id + ">");
    }
}

function init(type, message, config) {
    const embed = new Discord.RichEmbed();
    if (type == "default") {
        embed.setColor(config.embedcolors.dark).setTitle("Help");
        Object.keys(config.commands).forEach(function(elem){
            if (elem != "owner") {
                embed.addField(config.prefix + eval("config.commands." + elem + ".name"), eval("config.commands." + elem + ".short"));
            }
        });
        if (message.author.id == config.ownerid) {
            embed.addBlankField();
            embed.addField("OWNER COMMANDS", "\u200b");
            Object.keys(config.commands.owner).forEach(function(elem){
                embed.addField(config.prefix + eval("config.commands.owner." + elem + ".name"), eval("config.commands.owner." + elem + ".short"));
            });
        }
        embed.addBlankField()
            .addField(config.embedsplit.long, "Use `" + config.prefix + "help [command]` for more details.")
            .setTimestamp();
        message.channel.send(embed);
    } else {
        if (/^[A-Za-z0-9]+$/.test(type) && /^[A-Za-z]+$/.test(type.charAt(0))) {
            if (typeof eval("config.commands." + type) !== 'undefined') {
                embed.setColor(config.embedcolors.dark)
                    .setTitle(eval("config.commands." + type + ".name") + " help")
                    .addField(config.prefix + eval("config.commands." + type + ".name"), eval("config.commands." + type + ".long"))
                    .setTimestamp();
                message.channel.send(embed);
            } else if (typeof eval("config.commands.owner." + type) !== 'undefined') {
                if (message.author.id == config.ownerid) {
                    embed.setColor(config.embedcolors.dark)
                        .setTitle(eval("config.commands.owner." + type + ".name") + " help")
                        .addField(config.prefix + eval("config.commands.owner." + type + ".name"), eval("config.commands.owner." + type + ".long"))
                        .setTimestamp();
                    message.channel.send(embed);
                } else {
                    message.channel.send(config.error.owner + "<@" + message.author.id + ">");
                }
            } else {
                message.channel.send(config.error.helpna + "<@" + message.author.id + ">");
            }
        } else {
            message.channel.send(config.error.helpna + "<@" + message.author.id + ">");
        }
    }
}

module.exports = {
    start: function(message, config) {
        exceptions(message, config);
    }
}