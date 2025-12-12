import Todo from '../models/todo.model.js';

//Create Todo
export const createTodo = async (req, res, next) => {
    try {
        //extract the incoming data from req.body
        const { title } = req.body;

        //check for userId in req.user
        const userId = req.user.userId;

        //create a new Todo instance
        const todo = await Todo.create({
            userId,
            title
        })

        //send response
        res.status(201).json({
            success: true,
            message: 'Todo created successfully'
        })
    } catch (error) {
        //catch the error
        next(error);
    }
}

//Get all Todos
export const getAllTodos = async (req, res, next) => {
    try {
        //validate userId from req.user
        const userId = req.user.userId;

        //fetch all todos
        const todos = await Todo.find({ userId }).sort({ createdAt: -1 });

        //send reponse
        res.status(200).json({
            success: true,
            message: 'Todos fetched successfully',
            data: todos
        })

    } catch (error) {
        next(error);
    }
};

//Update single Todo
export const updateTodo = async (req, res, next) => {
    try {
        //get todo Id from req.params
        const { id } = req.params;

        //extract update data from req.body
        const { title, completed } = req.body;

        //get userId from req.user
        const userId = req.user.userId;

        //get the todo from the database
        const todo = await Todo.findOneAndUpdate(
            { _id: id, userId },
            { title, completed },
            { new: true, runValidators: true }
        )
        //if todo not found
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
                data: todo
            })
        }
        //success response
        res.status(200).json({
            success: true,
            message: 'Todo updated successfully',
            data: todo
        })
    } catch (error) {
        next(error)
    }
}

//Delete single Todo
export const deleteTodo = async (req, res, next) => {
    try {
        //get todo Id from req.params
        const { id } = req.params;

        //get userId from req.user
        const userId = req.user.userId;

        //delete the todo from the database
        const todo = await Todo.findOneAndDelete({ _id: id, userId })

        //todo not found or not belong to the user
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
                data: todo
            })
        }

        //success response
        res.status(200).json({
            success: true,
            message: 'Todo deleted successfully',
            data: todo
        })
    } catch (error) {
        next(error)
    }
}