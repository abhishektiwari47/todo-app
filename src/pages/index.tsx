// pages/index.tsx
import React from 'react';
import Header from '../components/Header';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import { GetServerSideProps } from 'next/types';
import { connectToDatabase } from '@/db/connectDb';
import { parse } from 'cookie';
import middleware from '@/utils/middleware';


const Index: React.FC = () => {

  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectToDatabase();
  // Example of accessing cookies from the request in getServerSideProps
const cookies = parse(context.req.headers.cookie || '');
const jwtToken = cookies.jwtToken;
console.log("the token is")
console.log(jwtToken)
if(!jwtToken)
{
  return {
    redirect: {
      destination: '/auth', // Adjust the destination path as needed
      permanent: false,
    },
  };
}


  // Decode the JWT token to get the username
  const decodedToken = await decodeJwtToken(jwtToken);
  const username = decodedToken || '';
  console.log("userside"+username);
  // Redirect to the home page with the username in the URL
  return {
    redirect: {
      destination: `/${username}`,
      permanent: false,
    },
  };
};

const decodeJwtToken = async (jwtToken: string) => {
  let username = '';
  
  console.log("this is from jwtToken");
  console.log(jwtToken);
  if (jwtToken) {
    const decodedUser = await middleware("Bearer "+jwtToken);
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
  console.log("serverside"+username)
  return username; // Replace with actual decoding logic
};


export default Index;
