const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log("server is running");
});
