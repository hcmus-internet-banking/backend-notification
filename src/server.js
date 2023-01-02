import * as dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import route from './routes/index.js';
import WebSockets from './utils/WebSockets.js';

dotenv.config();

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// set global variables for socket.io
global.io = io;
global.io.on('connection', WebSockets.connection);

const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', route);

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
