const express = require("express")
const cors = require("cors")
const http = require("node:http")
const dotenv = require("dotenv")
dotenv.config()
const {config} = require("./config/config")
const path = require("node:path")
const bodyParser = require("body-parser")
const { Token } = require("./lib/token")
const {Server} = require("socket.io")
const {Repository} = require("./lib/repository")
const {TokenData} = require("./lib/tokenData")

const tokenPath = path.resolve("database", "token.json")
const keyPath = path.resolve("database", "key.json")
const tokenRepo = new Repository(tokenPath)
const keyRepo = new Repository(keyPath)



const app = express()
const server = http.createServer(app)
const io = new Server(server, {cors : {origin : "*"}})
app.use(cors())
app.use(express.json())

app.get("/token", (req, res)=>{
    res.render("token.ejs")
})

io.on("connection", (socket)=>{
    socket.on("key", async (data)=>{
        const readFile = await keyRepo.read()
        
        readFile.forEach(element => {
            if (element.key === data) {
                    const token = new Token(data).generateToken()
                    socket.emit("token_id", token)
            } else {
                socket.emit("key_not", {message : "key notog'ri!"})
            }
        });
    })

    socket.on("token", (data)=>{
        const tokenData = {
            token : data,
            yasalganVaqt : Math.trunc(new Date().getTime()) 
        }

        socket.emit("tokenData", tokenData)
    })
})



server.listen(config.PORT, ()=>{
    console.log("http://localhost:" + config.PORT);
})


