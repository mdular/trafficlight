var sp = require('./handler.js').handler;

// var portName = '/dev/tty.usbserial-A7006Tv2';
var portName = '/dev/tty.arduino-DevB';
// var portName = '/dev/tty.usbserial-AL01CANK';

sp.on('open', function () {
    console.log('serial connection established.');
})

sp.on('data', function (input) {
    console.log('recieved serial data:', input);
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (input) {
    input = input.replace('\n', '');

    console.log('received input:', input);

    sp.write(input, function (err, result) {
        if (err) throw new Error(err);

        console.log('write result (bytes):', result);
    })

    if (input === 'quit\n') {
      quit();
    }
});

function quit() {
    console.log('bye');
    process.exit();
}
