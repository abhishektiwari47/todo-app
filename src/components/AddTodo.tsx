// components/AddTodo.tsx
import { todosState, Todo } from "@/store/atoms";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios"; // Import Axios

const AddTodo: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [todos, setTodos] = useRecoilState(todosState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = async () => {
    console.log(todos.length)
    try {
      // If the request is successful, update the local state

      const newTodoItem: Todo = {
        id: todos.length + 1,
        todo: newTodo,
      };
      // Make a POST request to your API endpoint using Axios
      console.log("here");
      console.log(newTodo)
      console.log(todos.length)
      
      const res = await axios.post("/api/addTodo", {
        id: todos.length + 1,
        todo: newTodo,
      });
      setTodos([...todos,newTodoItem])
      console.log(res.data)
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

   

  return (
    <div>
      <h2>Add Todo</h2>
      <input type="text" value={newTodo} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default AddTodo;
