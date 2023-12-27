import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    username:String,
    todo: String
});
const userSchema = new mongoose.Schema({
    username:String,
    password:String
})

export const Todo = mongoose.models.todolist || mongoose.model('todolist', todoSchema);
export const User = mongoose.models.user || mongoose.model('user', userSchema);