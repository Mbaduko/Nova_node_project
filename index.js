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

server.put("/students/:name", (req, res, next) => {
    const name = req.params.name;
    students.forEach((student, index) => {
        if (student.name === name)
            students[index].age = req.body.age;
        res.json({
            message: "Student updated successfully",
        })
    });
})

server.get("/students", (req, res, next) => {
    const ageLimit = req.query.ageLimit;
    if(!ageLimit)
        res.json(students)
    res.json(students.filter((student) => student.age < ageLimit));
})

server.listen (PORT, () => {
    console.log(`Server is running!!! on port : ${PORT}`)
})