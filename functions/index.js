const functions = require('firebase-functions'),
    admin = require('firebase-admin'),
    request = require('request'),
    gcloud = require('google-cloud');

const serviceAccount = require("./memezinga-firebase-adminsdk-csaaf-07394a324f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://memezinga.firebaseio.com"
});

const storage = gcloud.storage({
    projectId: serviceAccount.project_id,
    keyFilename: 'service-account-credentials.json',
});

const bucket = storage.bucket(`${serviceAccount.project_id}.appspot.com`)


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

exports.upload = functions.https.onRequest((req, res) => {
    let storageRef = admin.storage().bucket().ref();
    
    function downloadImg (item) {
        const extension = item.url.slice(-3);
        const location = `./img/${item.id}.${extension}`
        const options = {
            url: item.url,
            encoding: null
        };
    
        request(options, (err, res, body) => {
            if(!err){
                const buffer = Buffer.from(body, 'utf8');
                fs.writeFileSync(location, buffer)
                console.log("Downloaded as:", location)
                let uploadTask = storageRef.child('images/octofez.png').put(buffer);
                uploadTask.on('state_changed', function(snapshot){
                    console.log(`state_changed with ${item.id}:`, snapshot);
                }, function(error) {
                    console.error(`Error with ${item.id}:`, error);
                }, function() {
                    var downloadURL = uploadTask.snapshot.downloadURL;
                    console.log(`END with ${item.id}:`, downloadURL);
                });
            } else {
                console.error("-- ERROR", err)
            }

            
        })
    }
    
    request("https://api.imgflip.com/get_memes", { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        let data = body.data;
        console.log("data:", data.memes)
        data.memes.forEach((item)=>{
            downloadImg(item);
        })
    });



})