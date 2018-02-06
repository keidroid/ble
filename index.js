var bleno = require('bleno');

var name = 'raspberrypi';
var serviceUuids = ['180F'];

var primaryService = new bleno.PrimaryService({
    uuid: '180F',
    characteristics: [
        new bleno.Characteristic({
            uuid: '2A19',
            properties: ['read'],
            value: new Buffer([100])
        })
    ]
});

bleno.on('stateChange', function(state) {
    console.log('stateChange: '+state);
    if (state === 'poweredOn') {
        bleno.startAdvertising(name, serviceUuids, function(error){
            if (error) console.error(error);
        });
    } else {
        bleno.stopAdvertising();
    }
});
bleno.on('advertisingStart', function(error){
    if (!error) {
        console.log('start advertising...');
        bleno.setServices([primaryService]);
    } else {
        console.error(error);
    }
});
