import { createServer } from "@vercel/node";
import app from "../server.js";

const server = createServer(app);

export default server;
