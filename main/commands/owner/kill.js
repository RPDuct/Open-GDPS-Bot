module.exports = {
    start: function(message, process, config) {
        if (message.author.id == config.ownerid) {
            message.channel.send("Killed the process <@373128858687373323>").then(() => {
                process.exit(0);
            });
        } else {
            message.channel.send(config.error.owner + "<@" + message.author.id + ">");
        }
    }
}