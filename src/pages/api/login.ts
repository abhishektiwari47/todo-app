// pages/api/login.ts
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from '@/db/model'; // Assuming you have a User schema
import { NextApiRequest, NextApiResponse } from 'next';
// import connectToDatabase from '@/db/connectDb'; // Import your database connection function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // await connectToDatabase(); // Ensure database connection

    if (req.method === 'POST') {
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      // Compare the provided password with the hashed password in the database
      console.log(password)
      console.log(user.password)
      const isPasswordValid = await compare(password, user.password);
      console.log(isPasswordValid)

      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      // Generate a JWT token upon successful login
      const jwtToken = sign({ userId: user._id, username: user.username }, 'SECRET', {
        expiresIn: '7d', // Adjust the expiration time as needed
      });
      console.log(jwtToken)

      return res.status(200).json({ success: true, jwtToken });
    } else {
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
