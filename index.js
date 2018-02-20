var bleno = require('bleno');
//var util = require('util');

var primaryService = new bleno.PrimaryService({
    uuid: '180F',
    characteristics: [
        new bleno.Characteristic({
            uuid: '2A19',
            properties: ['read'],
            value: new Buffer([100])
        }),
        new bleno.Characteristic({
            uuid: '2A20',
            properties: ['write'],
            value: new Buffer([100])
        })
    ]
});

bleno.on('stateChange', function(state) {
    console.log('stateChange: ' + state);
    if (state === 'poweredOn') {
        bleno.startAdvertising('haseberrypi', ['180F'], function(error) {
            if (error) {
                console.error(error);
            }
        });
    } else {
        bleno.stopAdvertising();
    }
});
bleno.on('advertisingStart', function(error) {
    if (!error) {
        console.log('start advertising...');
        bleno.setServices([primaryService]);
    } else {
        console.error(error);
    }
});
