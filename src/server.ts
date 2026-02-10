import express from 'express';
import http from 'http';
import cors from 'cors';
import { config } from 'dotenv';
import { connectDB, disconnectDB } from './config/db';
import { handleUnhandledRejection, handleUncaughtException, handleSigterm } from './exceptions/database-exceptions';
//import routes
import dashboardRoutes from './routes/dashboardRoutes';

config();
const app = express();
connectDB();

app.use(cors(
    {
        credentials: true,
    }
))

app.use(express.json());

const server = http.createServer(app);
app.use("/api/dashboard", dashboardRoutes);

server.listen(process.env.PORT || 8080,() => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`);
})

//handle exceptions and rejections
handleUnhandledRejection(server);
handleUncaughtException(server);
handleSigterm(server);

