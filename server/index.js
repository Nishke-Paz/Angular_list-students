const path = require("path")

const st = require("./studets.json")
//
// import * as listStudents from "./studets.json";

const express = require('express');

const PORT = 3000;
const app = express();

app.listen(PORT, () => {
  console.log(`Server has been start on port ${PORT}`);
})

app.use(express.urlencoded());

app.use(express.json());


app.post('/search', function(request, response){
  console.log("hello from server, your req = " + request.body.dish)
  response.json({dish: `${new Date()}`})
});

app.get("/api", function (req, res) {
  res.status(200).json(st);
});
