var serialport = require('serialport');

module.exports.handler = new serialport.SerialPort('/dev/tty.arduino-DevB', {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline('\r\n')
});