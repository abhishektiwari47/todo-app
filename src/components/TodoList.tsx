// components/TodoList.tsx
import { connectToDatabase } from '@/db/connectDb';
import { todosState } from '@/store/atoms';
import middleware from '@/utils/middleware';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import { Todo } from '@/db/model';

interface Todo {
  id: number;
  todo: string;
}
// components/TodoList.tsx
// ... other imports ...

const TodoList: React.FC = () => {
  const [todos, setTodo] = useRecoilState(todosState);
  const handleDelete = async (todoId: string) => {
    try {
      const jwtToken = Cookies.get('jwtToken');
      const response = await axios.delete('/api/deleteTodo', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        data: { todoId },
      });

      if (response.data.success) {
        // Update the local state after successful deletion
        setTodo((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
      } else {
        console.error('Error deleting Todo:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting Todo:', error);
    }
  };

  useEffect(() => {
    async function getTodo() {
      try {
        const jwtToken = Cookies.get('jwtToken');
        const response = await axios.get('/api/getTodo', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        setTodo(response.data.todoList);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }

    getTodo();
  }, []);

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
        
            <li key={todo._id}>{todo.todo}
            <button onClick={() => {
              console.log(todo._id)
              if(todo._id)
              {
                handleDelete(todo._id);
              }
            }}>Delete</button>
            </li>
        
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
