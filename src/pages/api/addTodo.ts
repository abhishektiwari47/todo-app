import { Todo } from '@/db/model';
import middleware from '@/utils/middleware';
import { log } from 'console';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let username = '';
  const jwtToken = req.headers.authorization;
  console.log("this is from jwtToken");
  console.log(jwtToken);
  if (jwtToken) {
    const decodedUser = await middleware(jwtToken);
    console.log("this is decoded");
  
    if (typeof decodedUser === 'string') {
      console.error('Unexpected string format for decoded user');
    } else if (decodedUser && decodedUser.username) {
      username = decodedUser.username;
      console.log(`Username: ${username}`);
    } else {
      console.error('Username not found in decoded user object');
    }
  } else {
    console.error('JWT token not found');
  }
    if (req.method === 'POST') {
      // Parse the incoming JSON data from the request body
      console.log("we are in server")
      const {id, todo } = req.body;
       const idNumber:number = id;
       const todoItem:string = todo;
      // Create a new todo document
      const newTodo = new Todo({username:username, todo:todoItem });

      // Save the todo to the database
      const response = await newTodo.save();
      console.log("this is from save")
      console.log(response)

      return res.status(201).json({ success: true, message: 'Todo added successfully',data:response._id});
    } else {
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.log("there was some error");
    
    console.error('Error adding todo:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
