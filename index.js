const express = require("express");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const server = express();

const connPool = mysql.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

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

server.listen (PORT, async () => {
    try{
        const connection = await connPool.getConnection();
        console.log("Connection successful");
        console.log(`Server is running!!! on port : ${PORT}`)
    } catch (error) {
        console.error(error);
    }
});