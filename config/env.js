import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

//Destructure envirenment variables from process.env
export const {
    PORT,
    NODE_ENV,
    DB_URI,
    USER_COLLECTION,
    TASK_COLLECTION,
    SESSION_SECRET,
    SESSION_TTL,
    SESSION_MAXAGE
} = process.env;