var request = require('request');
var handler = require('./handler.js').handler;

handler.on('open', function () {
    update();
    setInterval(update, 10000);
});

function update() {
    request('http://direct.luciamussini.com/raining/Berlin', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            handler.write(JSON.parse(body).raining ? '0' : '2');
        }
    });
}