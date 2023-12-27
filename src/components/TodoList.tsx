// components/TodoList.tsx
import { connectToDatabase } from '@/db/connectDb';
import { todosState } from '@/store/atoms';
import middleware from '@/utils/middleware';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';

interface Todo {
  id: number;
  todo: string;
}

const TodoList: React.FC = () => {
// Dummy data for illustration
  const [todos,setTodo] = useRecoilState(todosState);
  useEffect(() => {
    async function getTodo() {
      try {
        const jwtToken2 =  Cookies.get('jwtToken')
        const jwtToken = "Bearer "+ jwtToken2; 
        console.log(jwtToken)
       

        const response = await axios.get("/api/getTodo",{
          headers: {
            Authorization: jwtToken,
          },
        });
        console.log("this is todo");
        console.log(response.data.todoList); // Assuming the property is 'todoList'
        setTodo(response.data.todoList);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }

    getTodo();
  }, []); 


  return (
    <div>
        <br />
        <br />
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={Math.random()}>{todo.todo}</li>
        ))}
      </ul>
      <br/>
      <br/>
    </div>
  );
};

export default TodoList;

