require("dotenv").config();
const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.URl);
const db = client.db("ContentSharing").collection("data");
let content = "";
client.connect();
app.use(express.json({ limit: "20mb" }));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

app.post("/submit", async (req, res) => {
  try {
    let result = await db.findOne({ name: req.body.name });
    if (result) {
      res.send({ status: 302 });
      return;
    }
    result = await db.insertOne(req.body);
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

app
  .route("/find")
  .post((req, res) => {
    res.send(content);
  })
  .put(async (req, res) => {
    const result = await db.findOne({ name: req.body.name });
    if (result) {
      res.send({ status: 302 });
      return;
    }
    res.send({ status: 404 });
  });
app.listen(process.env.PORT);
