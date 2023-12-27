// pages/index.tsx
import React from 'react';
import Header from '../components/Header';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import { GetServerSideProps } from 'next/types';
import { connectToDatabase } from '@/db/connectDb';
import { parse } from 'cookie';


const Home: React.FC = () => {

  return (
    <div>
      <Header />
      <TodoList />
      <AddTodo />
    </div>
  );
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


  return {
    props: {},
  };
};

export default Home;
