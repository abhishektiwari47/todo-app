import { Todo } from '@/db/model';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
  try{

    if(req.method === 'GET')
    {
        const todoList = await Todo.find({}).exec();
       console.log(todoList)
       res.status(202).json({todoList});
    }
  }
  catch(error){
    console.error('Error adding todo:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}