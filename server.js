let firebase = require("firebase");
let express = require("express");
let app = express();


let port = 3000;
let hostname = "localhost";

app.use(express.static("public_html"));
app.use(express.json());

const firebaseConfig = require("./env.json");
firebase.initializeApp(firebaseConfig);

app.post("/signUp", function (req, res) {
    let user = req.query.username;
    let pass = req.query.pass;
    firebase.auth().createUserWithEmailAndPassword(user, pass).then(function() {
        firebase.auth().onAuthStateChanged(function(user){
			if(user){
				//make database for them ** needs implementation **
				res.status(200).json({userId: user.email});
			}
			else{
				console.log("User is signed out");
			}
		})
    }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
        res.status(400).json(error);
    })
});

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});