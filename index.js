const express = require("express");

const server = express();

const PORT = 3000;

const students = [];


server.use(express.json())

server.route("/").get((req, res, next) => {
    res.send("Hello tethjygyu")
})

server.post("/add", (req, res, next)=> {
    const inputs = req.body;
    students.push(inputs);

    // console.log(students);
    res.json(inputs);
})

server.get("/students", (req, res, next) => {
    res.json(students)
})

server.listen (PORT, () => {
    console.log(`Server is running!!! on port : ${PORT}`)
})