import { Todo } from '@/db/model';
import { log } from 'console';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    
    if (req.method === 'POST') {
      // Parse the incoming JSON data from the request body
      console.log("we are in server")
      const {id, todo } = req.body;
       const idNumber:number = id;
       const todoItem:string = todo;
      // Create a new todo document
      const newTodo = new Todo({id:idNumber, todo:todoItem });

      // Save the todo to the database
      await newTodo.save();

      return res.status(201).json({ success: true, message: 'Todo added successfully', });
    } else {
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.log("there was some error");
    
    console.error('Error adding todo:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
