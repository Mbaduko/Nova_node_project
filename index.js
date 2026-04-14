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

server.route("/").get(
    (req, res, next) => {
    res.send("Hello tethjygyu")
    }

)

server.post("/add", 
    (req, res, next) => {
        const inputs = req.body;

        if(!inputs.name || !inputs.age)
            res.status(400).json({
                message: "Name and age are required"
            })
        next();
    },
    async (req, res, next)=> {
        try{
            const inputs = req.body;
            const [results] = await connPool.execute("INSERT INTO student (name, age) VALUES(?, ?)", [inputs.name, inputs.age]);
            res.json({
                message: "Byaciyemo",
                userId: results.insertId
            });
        } catch(error) {
            console.error(error);
            res.json({
                message: "Error adding new student",
            })
        }
    }
)

server.put("/students/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        
        const [results] = await connPool.execute("UPDATE student SET name = ? WHERE id = ?", [name, id]);
        console.log(results);
        res.status(200).json({
            message: "Birakora"
        })
        
    } catch (error) {
        console.error(error);
        res.json({
            message:"Erro"
        });
    }
    const id = req.params.id;
})

server.get("/students", async (req, res, next) => {
    try {
        const [results] = await connPool.execute("select * from student");
        res.json({
            message:"Students fetched successfully",
            data: results
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Error while fetching students"
        })
        
    }
})

server.listen (PORT, async () => {
    try{
        const connection = await connPool.getConnection();
        console.log("Connection successfu");
        console.log(`Server is running!!! on port : ${PORT}`)
    } catch (error) {
        console.error(error);
    }
});