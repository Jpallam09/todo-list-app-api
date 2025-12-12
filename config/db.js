import mongoose from "mongoose";
import { DB_URI, NODE_ENV, USER_COLLECTION, TASK_COLLECTION } from "../config/env.js";

if (!DB_URI || !USER_COLLECTION || !TASK_COLLECTION) {
    throw new Error('Please define the MongoDB URI, USER_COLLECTION, TASK_COLLECTION environtment inside .env.<development/production>.env.local');
}


const RETRY_INTERVAL = 5000;

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(DB_URI, {
            family: 4,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000
        });

        console.log(`➤ Connected to Database in ${NODE_ENV} mode...`)
    } catch (error) {
        console.error(`➤ MongoDB connection failed, retrying in ${RETRY_INTERVAL / 1000}s.`, error);
        setTimeout(connectDB, RETRY_INTERVAL);
    };
}

export default connectDB;