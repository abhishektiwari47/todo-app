// pages/[username]/[about].tsx
import { useRouter } from 'next/router';
import React from 'react';
import Cookies from 'js-cookie';

const AboutPage: React.FC = () => {
  const router = useRouter();
  const { username, about } = router.query;
 
  return (
    <div>
      <h1>About Page</h1>
      <p>Username: {username}</p>
      <p>About: {about}</p>
      <button onClick={
         ()=>{
          
       Cookies.remove('jwtToken');
        router.replace('/');
      }
      }>Logout</button>
    </div>
  );
};

export default AboutPage;
