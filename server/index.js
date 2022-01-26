const express = require('express');
let students = require("./students.json");

const PORT = 3000;
const app = express();

app.listen(PORT, () => {
  console.log(`Server has been start on port ${PORT}`);
})

app.use(express.urlencoded());

app.use(express.json());

app.get("/api", function (req, res) {
  res.status(200).json(students);
});

app.post("/sendData", (req, res) => {
  students.push(req.body);
})
