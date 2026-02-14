const express = require("express");
const app = express();
let logs = [];

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/logs", (req, res) => {
  logs.push(req.body);
  if (logs.length > 50) logs = logs.slice(-50);
  console.log("Log added:", req.body.eventType);
  res.json({success: true});
});

app.get("/logs", (req, res) => {
  res.json(logs.sort((a,b) => b.timestamp - a.timestamp));
});

app.get("/", (req, res) => {
  res.json({status: "🐝 Bee Swarm API READY", logs: logs.length});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on port ${port}`));
