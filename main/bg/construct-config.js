const request = require('request');

module.exports = {
    build: new Promise(function(resolve) {
        request("https://smjs.eu/dibot/jsoninfo.php?host=" + require("./../config.json").host, function (error, response, body) {
            if (typeof response !== 'undefined' && response.statusCode < 300) {
                if (error) throw error;
                if (body == "") {
                    process.exit(0);
                } else {
                    resolve(Object.assign({}, require("./../config.json"), JSON.parse(body)));
                }
            }
        });
    })
}