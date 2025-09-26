const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Router = require("./routers/mainRouter")
const userDb = require("./models/userSchema")

const {createServer} = require("http");
const {Server} = require("socket.io");
const httpServer = createServer(app)

dotenv.config();

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

const userSockets = new Map()
const socketUsers = new Map()
const lastMessages = []

io.on("connection", (socket) => {
    console.log("New user connected")

    socket.on("authenticate", (userData) => {
        const {userId, username} = userData

        if(!userSockets.has(userId)) {
            userSockets.set(userId, [])
        }

        userSockets.get(userId).push(socket.id)
        socketUsers.set(socket.id, userId)

        socket.join(`user:${userId}`)

        console.log(`User ${username} (ID: ${userId}) authenticated with socket ${socket.id}`)
        console.log(`User ${username} now has ${userSockets.get(userId).length} active sockets`)
    })

    socket.on("getChatHistory", async () => {
        socket.emit("liveChat", {
            type: "history",
            messages: lastMessages
        })

    })

    socket.emit("liveChat", {
        type: "history",
        messages: lastMessages
    })

    socket.on("liveChat", (data) => {
        lastMessages.push(data)
        if(lastMessages.length > 10) {
            lastMessages.shift()
        }
        io.emit("liveChat", {
            type: "new",
            message: data,
            allMessages: lastMessages
        })
    })

    socket.on("poke", async (data) => {
        console.log(data)

        const pokingUser = await userDb.findOne({username: data.pokerUsername})
        const pokedUser = await userDb.findOne({username: data.pokedUsername})
        const existingPoke = pokedUser.pokes.find(poke => poke.username === pokingUser.username)

        if(!pokingUser) {
            return socket.emit("poke", {success: false, message: "Poking user not found"})
        }
        if(!pokedUser) {
            return socket.emit("poke", {success: false, message: "Poked user not found"})
        }
        const pokeInfo = {
            username: pokingUser.username,
        }

        if(existingPoke) {
            const updatedPokedUser = await userDb.findOneAndUpdate({_id: pokedUser._id, "pokes.username": pokingUser.username}, {
                $set: {'pokes.$.date' : Date.now()}
            })
            socket.emit("poke", {success: true, message: "You already poked this user, so just the date is updated"})
        } else {
            const updateUser = await userDb.findOneAndUpdate({_id: pokedUser._id}, {
                pokes: [...pokedUser.pokes, pokeInfo]
            })
            const message = {
                success: true,
                message: `${pokingUser.username} Poked ${pokedUser.username}`
            }
            socket.emit("poke", message)
        }



        /*------------------------*/

        const pokedUserId = pokedUser._id.toString()
        const pokedSocketIds = userSockets.get(pokedUserId)

        if(pokedSocketIds && pokedSocketIds.length > 0) {
            const notification = {
                type: "poke",
                message: `${pokingUser.username} Poked you!`,
                from: {
                    id: pokingUser._id,
                    username: pokingUser.username
                },
                date: Date.now()
            }
            pokedSocketIds.forEach(socketId => {
                io.to(socketId).emit("notification", notification)
            })
            console.log(`Sent poke notification to ${pokedUser.username} at ${pokedSocketIds.length} sockets`)
        }

    })
})

mongoose.connect(process.env.MONGO_KEY)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.log(err)
    })

app.set("io", io)

app.use(cors());
app.use(express.json());
app.use("/api", Router)


httpServer.listen(2500, () => {
    console.log("Server is running on http://localhost:2500/api");
});