import { disconnectDB } from "../config/db";

const handleUnhandledRejection = (server: any) => {
    process.on("unhandledRejection",(err) => {
        console.error("Unhandled Rejection:", err);
        server.close(async () => {
            await disconnectDB();
            process.exit(1);
        });
    })
};

const handleUncaughtException = (server: any) => {
    process.on("uncaughtException", async (err) => {
        console.error("Uncaught Exception:", err);
        await disconnectDB();
        process.exit(1);
    });
};

const handleSigterm = (server: any) => {
    process.on("SIGTERM",() => {
        console.log("SIGTERM received, shutting down gracefully");
        server.close(async () => {
            await disconnectDB();
            process.exit(0);
        });
    });
};

export { handleUnhandledRejection, handleUncaughtException, handleSigterm };
