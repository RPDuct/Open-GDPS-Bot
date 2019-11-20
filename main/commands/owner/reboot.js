module.exports = {
    start: function(message, client, config) {
        if (message.author.id == config.ownerid) {
            message.channel.send("Rebooting...").then((msg) => {
                client.destroy().then(() => {
                    client.login(config.token).then(() => {
                        msg.edit("Done!");
                    });
                });
            });
        } else {
            message.channel.send(config.error.owner + "<@" + message.author.id + ">");
        }
    }
}