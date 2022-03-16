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
  let userEmail = req.body.userEmail;
  let buffer;
  firestore.collection('users').doc(userEmail).get().then(function (response) {
    buffer = response.data().calendarEvents;
    buffer['test2'] = "working";
    console.log(buffer);
  }).then( function () {
    firestore.collection('users').doc(userEmail).set({
      calendarEvents: buffer
    })
  })
  res.status(200).send();

})

app.use(express.static("public_html"));

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});