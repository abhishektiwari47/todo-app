// pages/api/deleteTodo.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/db/connectDb';
import { Todo } from '@/db/model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 

  if (req.method === 'DELETE') {
    try {
      const { todoId } = req.body;
      // Validate todoId if needed
      await Todo.findByIdAndDelete(todoId);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting Todo:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
