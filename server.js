import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 8000;

io.on("connection", (socket) => {
    console.log("a user connected on ", socket.id);
    socket.on("disconnect", () => {
        console.log("user disconnected ", socket.id);
    });
    socket.on("test", (data) => {
        console.log(data);
    });
});


httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});