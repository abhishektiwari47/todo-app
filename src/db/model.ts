import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    id:Number,
    todo: String
});

export const Todo = mongoose.models.todolist || mongoose.model('todolist', todoSchema);