let express = require("express");
let cors = require("cors");
let app = express();
let admin = require("firebase-admin");
let serviceAccount = require("./serviceAccountKey.json");

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
  let eventID = req.body.eventID;
  let eventTitle = req.body.eventTitle;
  let buffer;

  firestore.collection('users').doc(userEmail).get().then(function (response) {
    buffer = response.data().calendarEvents;
    buffer[`${eventTitle}`] = `${eventID}`;
  }).then( function () {
    firestore.collection('users').doc(userEmail).set({
      calendarEvents: buffer
    })
  })
  res.status(200).send();
})

app.post("/deleteEvent", function (req, res) {
  let userEmail = req.body.userEmail;
  let eventTitle = req.body.eventTitle;
  let buffer;

  firestore.collection('users').doc(userEmail).get().then(function (response) {
    buffer = response.data().calendarEvents;
    delete buffer[`${eventTitle}`];
  }).then( function () {
    firestore.collection('users').doc(userEmail).set({
      calendarEvents: buffer
    })
  })
  res.status(200).send();
})

app.post("/getEeventID", function (req, res) {
  let userEmail = req.body.userEmail;
  let eventTitle = req.body.eventTitle;

  firestore.collection('users').doc(userEmail).get().then(function (response) {
    let eventID = response.data().calendarEvents[`${eventTitle}`];
    res.status(200).json({
      "eventID": eventID
    });
  }).catch(function (error) {
    res.status(400).send()
  })
})

app.use(express.static("public_html"));

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});