// components/AddTodo.tsx
import { todosState, Todo, userState } from "@/store/atoms";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Cookies from 'js-cookie';
import axios from "axios"; // Import Axios

const AddTodo: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [todos, setTodos] = useRecoilState(todosState);
  const [user,setUser] = useRecoilState(userState); 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = async () => {
    console.log(todos.length)
    try {
      // If the request is successful, update the local state


      // Make a POST request to your API endpoint using Axios
      console.log("here");
      console.log(newTodo)
      console.log(todos.length)
      const jwtToken2 =  Cookies.get('jwtToken')
      const jwtToken = "Bearer "+ jwtToken2; 
      const res = await axios.post("/api/addTodo", {
        todo: newTodo,
      },{
        headers: {
          Authorization: jwtToken,
        },
      });
      console.log("this is id from server")
      console.log(res.data.data);
      
      const newTodoItem: Todo = {
        _id:res.data.data,
        username: user,
        todo: newTodo,
      };
      setTodos([...todos,newTodoItem])
      console.log(res.data)
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

   

  return (
    <div>
      <h2>Hi, {user} Add A New Todo...</h2>
      <input type="text" value={newTodo} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default AddTodo;
