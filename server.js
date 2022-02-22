let express = require("express");
let app = express();

let port = 3000;
let hostname = "localhost";

app.use(express.static("public_html"));

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});