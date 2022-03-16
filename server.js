let express = require("express");
var cors = require("cors");
let app = express();
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let port = 8080;
let hostname = "localhost";
let firestore = admin.firestore();

app.use(cors());
app.use(express.static("public_html"));
app.use(express.json());

app.post("/insertEvent", function (req, res) {
  let useremail = req.body.useremail;
  firestore.collection('users').doc(useremail).get().then(function (response) {
    console.log(response)
  });
  res.status(200).send();

})

app.use(express.static("public_html"));

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});