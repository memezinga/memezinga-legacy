const functions = require('firebase-functions'),
    request = require('request');

exports.api = functions.https.onRequest((req, res) => {
    request("https://api.imgflip.com/get_memes", { json: true }, (error, response, body) => {

        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   
        if (error) { 
            console.log(error)
            res.json(JSON.stringify(error))
        } else {
            res.json(body)
        }

    });
});
