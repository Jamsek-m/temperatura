import app from "./app";
import * as http from "http";
import {Server} from "http";

const PORT = process.env.APP_PORT || 3000;

const server: Server = http.createServer(app);
server.listen(PORT);
server.on("error", onError);
server.on("listening", onListening);

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = (typeof PORT === "string") ? "Pipe " + PORT : "Port " + PORT;
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    console.log(`Server listening on http://localhost:${PORT}`);
}
