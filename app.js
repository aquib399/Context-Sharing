require("dotenv").config();
const express = require("express");
const app = express();
const BP = require("body-parser");
const port = process.env.PORT || 3000;
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.URL);
const db = client.db("ContentSharing").collection("data");
client.connect().then(() => console.log("Connected"));
let content = "";
let details = {};
function getData() {
    details = require("./script");
}
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/submit", async (req, res) => {
    try {
        const result = await db.insertOne(req.body);
        console.log("Inserted");
        res.send(result);
    } catch (e) {
        console.log("Too big file");
        res.send({ code: 503, status: e });
    }
});

app.get("/:name", async (req, res) => {
    const result = await db.findOne({ name: req.params.name });
    if (result) {
        content = result;
        console.log("found ->", result.name);
        res.sendFile(__dirname + "/content.html");
        return;
    }
    console.log("Not found");
    res.sendFile(__dirname + "/404.html");
});

app.route("/find")
    .post((req, res) => {
        res.send(content);
    })
    .put(async (req, res) => {
        const result = await db.findOne({ name: req.body.name });
        if (result) {
            res.send(result);
            return;
        }
        res.send({ status: 404, message: "Not found" });
    });

console.clear();
app.listen(port, console.log(`Listening at http://localhost:${port}`));
