import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: 200,
        minLength: 1
    },
    completed: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;