import 'dotenv/config';
import http from 'http';
import app from './app.js';
// TODO: import connectDB from './config/db.js'; import { initSockets } from './sockets/index.js';

const server = http.createServer(app);
// TODO: await connectDB(); initSockets(server);
server.listen(process.env.PORT || 5000, () => console.log(`Server running on ${process.env.PORT || 5000}`));
