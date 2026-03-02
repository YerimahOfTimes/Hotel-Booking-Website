import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebHooks from "./Controllers/clerkWebHooks.js";

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

app.use("/api/clerk", clerkWebHooks)

app.get("/", (req, res) => res.send("API is working 🚀"))

// ❌ REMOVE app.listen()
// ✅ EXPORT INSTEAD
export default app;