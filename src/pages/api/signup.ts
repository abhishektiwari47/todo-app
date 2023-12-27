// pages/api/signup.ts
import { User } from '@/db/model'; // Import your User schema
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
// import {connectToDatabase} from '@/db/connectDb'; // Import your database connection function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // await connectToDatabase(); // Ensure database connection

    if (req.method === 'POST') {
      // Parse the incoming JSON data from the request body
      const { username, password } = req.body;

      console.log(username);
      let x = await User.find({username})
      if(x.length!==0)
      {
         return res.status(401).json({message:"User Already Exists"});
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ username, password:hashedPassword });
      // Save the user to the database
      await newUser.save();
      return res.status(201).json({ success: true, message: 'User signed up successfully' });
    } else {
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error signing up:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
