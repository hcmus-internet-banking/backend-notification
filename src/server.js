import * as dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import route from './routes/index.js';
import { initialSocket } from './services/socket/socket.service.js';
dotenv.config();

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.SERVER_HCMUS_BANKING_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 8000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(route);

initialSocket(io);

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
