import middleware from "@/utils/middleware";
import { verify } from "crypto";
import { NextApiRequest } from "next"

export default async function getUser(req:NextApiRequest,res:NextApiRequest){
    if(req.method==="GET")
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
    }
}