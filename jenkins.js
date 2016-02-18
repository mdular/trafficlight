var request = require('request');
var handler = require('./handler.js').handler;

var colorStateMap = {
    blue: '2',
    red: '0'
};

var current;

handler.on('open', function () {
    update();
    setInterval(update, 10000);
});

function update() {
    request(
        process.env.API_URL,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var color;
                try {
                    color = JSON.parse(body).color;
                    if (color !== current) {
                        console.log('Change ' + color + ' (' + (colorStateMap[color] ? colorStateMap[color] : '1') + ')');
                        current = color;
                    }
                } catch (err) {
                    color = 'red';
                }

                handler.write(colorStateMap[color] ? colorStateMap[color] : '1');
            }
        }
    );
}
