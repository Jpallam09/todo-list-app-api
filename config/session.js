import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import { DB_URI, SESSION_SECRET, SESSION_TTL, SESSION_MAXAGE } from "./env.js";

dotenv.config();

const sessionConfig = session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
        mongoUrl: DB_URI,
        collectionName: 'sessions',
        ttl: SESSION_TTL
    }),

    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: SESSION_MAXAGE * 1000
    }
});

export default sessionConfig;
