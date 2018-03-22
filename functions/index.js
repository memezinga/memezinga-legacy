const functions = require('firebase-functions'),
    admin = require('firebase-admin'),
    request = require('request');

exports.memes = functions.https.onRequest((req, res) => {
    request("https://api.imgflip.com/get_memes", { json: true }, (error, response, body) => {
        //CORS
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
        //Filter
        var match = false;
        if(req.query.id) {
            for (var i = 0; i < body.data.memes.length; i++) {
                if(body.data.memes[i].id === req.query.id) {
                    body = body.data.memes[i];
                    match = true;
                    break;
                }
            }
        }
        
        //Erorr Management
        if (error) { 
            res.status(500).json("Our server is broken again.. xD");
            console.log("e500:", error)
        } else if (req.query.id && !match) {
            res.status(404).json("error! meme not found! :-(");
            console.log("e400 ID:", req.query.id)
        } else {
            res.json(body)
        }

    });
});

