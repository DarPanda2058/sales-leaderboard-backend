import express from 'express';
import http from 'http';
import cors from 'cors';
import { config } from 'dotenv';
import { connectDB, disconnectDB } from 'config/db';
import { handleUnhandledRejection, handleUncaughtException, handleSigterm } from 'exceptions/database-exceptions';

config();
const app = express();

app.use(cors(
    {
        credentials: true,
    }
))

const server = http.createServer(app);


server.listen(process.env.PORT || 8080,() => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`);
})

//handle exceptions and rejections
handleUnhandledRejection(server);
handleUncaughtException(server);
handleSigterm(server);

