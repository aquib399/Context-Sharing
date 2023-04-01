require("dotenv").config();
const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.URL);
const db = client.db("ContentSharing").collection("data");
let content = "";
client.connect();
app.use(express.json({ limit: "20mb" }));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    for (i = 0; i <= 100000; i++) {
        console.log(i);
    }
    res.sendFile(__dirname + "/index.html");
});

app.post("/submit", async (req, res) => {
    try {
        const result = await db.insertOne(req.body);
        res.send(result);
    } catch (e) {
        res.send({ code: 503, status: e });
    }
});

app.get("/:name", async (req, res) => {
    const result = await db.findOne({ name: req.params.name });
    if (result) {
        content = result;
        res.sendFile(__dirname + "/content.html");
        return;
    }
    res.sendFile(__dirname + "/404.html");
});

app.route("/find")
    .post((req, res) => {
        if (req.body.pass.length!=undefined) {
            if (content.password == req.body.pass) {
                res.send({ content: content.content });
                return;
            }
            res.send({ status: 406 });
        }
        if (content.password.length) {
            res.send({ status: 401, title: content.name });
            return;
        }
    })
    .put(async (req, res) => {
        const result = await db.findOne({ name: req.body.name });
        if (result) {
            res.send(result);
            return;
        }
        res.send({ status: 404, message: "Not found" });
    });
app.listen(process.env.PORT);