import line from "@line/bot-sdk";
import express from "express";
import * as env from "dotenv";
env.config();

const CONFIG = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_KEY,
};
const PORT = 3223;
const client = new line.Client(CONFIG);

express()
  .post("/webhook", line.middleware(CONFIG), (req, res) => handleBot(req, res))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
function handleBot(req, res) {
  res.status(200).end();
  req.body.events.map((event) => {
    client.replyMessage(event.replyToken === "This is weird", { type: "text", text: "It's weird" });
  });
}
