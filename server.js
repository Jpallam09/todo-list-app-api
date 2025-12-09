import app from './app.js';
import connectDB from './config/db.js'
import { PORT } from './config/env.js';

app.listen(process.env.PORT, async () => {
    console.log(`➤ Server is running in http://localhost:${PORT}`);
    await connectDB();
});