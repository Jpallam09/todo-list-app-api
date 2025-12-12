import express from 'express'
const app = express();
import sessionConfig from './config/session.js';
import todoRouter from './routes/todo.routes.js';
import authRouter from './routes/auth.routes.js';

app.use(express.json());
app.use(sessionConfig);

app.use('/api/', authRouter);
app.use('/api/todos', todoRouter);

app.get('/', async (req, res) => {
    res.send('Hello, World!');
});

export default app;