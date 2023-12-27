// components/Login.tsx
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // Make a POST request to your login API endpoint using Axios
      const response = await axios.post('/api/login', {
        username,
        password,
      });

      console.log(response.data); // Assuming your API returns a response

      // Assuming the API returns a JWT token upon successful login
      const jwtToken = response.data.jwtToken;
      // Save the JWT token to a cookie
      Cookies.set('jwtToken', jwtToken, { expires: 7 }); // Set the expiration date as needed

      // Redirect the user to the home page or another authenticated page
      router.push('/');

    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
