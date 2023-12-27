// components/Login.tsx
import axios from 'axios';
import { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      // Make a POST request to your signup API endpoint using Axios
      const response = await axios.post('/api/signup', {
        username,
        password,
      });

      console.log(response.data); // Assuming your API returns a response

      // Handle success, e.g., redirect the user to the login page
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error, e.g., show an error message to the user
    }
  
  };

  return (
    <div>
      <h2>Signup</h2>
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
        <button type="button" onClick={handleSignup}>
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Signup;
