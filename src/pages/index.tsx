// pages/index.tsx
import React from 'react';
import Header from '../components/Header';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import { GetServerSideProps } from 'next/types';
import { connectToDatabase } from '@/db/connectDb';

const Home: React.FC = () => {

  return (
    <div>
      <Header />
      <TodoList />
      <AddTodo />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await connectToDatabase();

  // Fetch data or perform other server-side operations...

  return {
    props: {},
  };
};

export default Home;
