var request = require('request');
var handler = require('./handler.js').handler;

var colorStateMap = {
    red: '0',
    disabled: '1',
    blue: '2',
    blue_anime: '3'
};

handler.on('open', function () {
    update();
    setInterval(update, 10000);
});

function update() {
    request(process.env.API_URL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var color = JSON.parse(body).color;
            if (colorStateMap[color]) {
                handler.write(colorStateMap[color]);
            }
        }
    });
}