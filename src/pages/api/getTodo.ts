import { Todo } from '@/db/model';
import middleware from '@/utils/middleware';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
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
  
  try{

    if(req.method === 'GET')
    {
        const todoList = await Todo.find({username}).exec();
        console.log("this si todo")
       console.log(todoList)
       res.status(202).json({todoList});
    }
  }
  catch(error){
    console.error('Error adding todo:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}