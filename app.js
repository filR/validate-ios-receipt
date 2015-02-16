var request = require('request');

// do we have the parameters we need
if (process.argv.indexOf('--receipt') === -1 ||
    process.argv.indexOf('--secret') === -1) {
    console.log('Usage: node.app.js --secret xxx --receipt xxx [--sandbox]');
    return;
}

// read command line parameters
var args = {
    sandbox: process.argv.indexOf('--sandbox') !== -1,
    receipt: process.argv[process.argv.indexOf('--receipt') + 1],
    secret: process.argv[process.argv.indexOf('--secret') + 1]
}

// payload to send to apple
var data = {
    'receipt-data': args.receipt,
    'password': args.secret
}

var verifyURL = 'https://buy.itunes.apple.com/verifyReceipt';
if (args.sandbox) {
    verifyURL = 'https://sandbox.itunes.apple.com/verifyReceipt';
}

request.post({ url: verifyURL, json: data }, function(err, res, body) {
    console.log(body);
});
