import { Router } from 'express';
import {
    createTodo,
    getAllTodos,
    updateTodo,
    deleteTodo
} from '../controllers/todo.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const todoRouter = Router();

// Create Todo
todoRouter.post('/', requireAuth, createTodo);

// Get all Todos
todoRouter.get('/', requireAuth, getAllTodos);

// Update specific Todo
todoRouter.put('/:id', requireAuth, updateTodo);

// Delete specific Todo
todoRouter.delete('/:id', requireAuth, deleteTodo);

export default todoRouter;
