import axios from 'axios';
import { useState } from "react";
import useAuth from '../hooks/useAuth';
import '../layout/styles.css';

export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    email: '', 
    password: '',
    role: 'USER' // Default role
  });

  const handleInputChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      // Validation

      const loginResponse = await axios.post('http://localhost:3000/auth/login', input);
      localStorage.setItem('token', loginResponse.data.token);
      const userResponse = await axios.get('http://localhost:3000/auth/me', {
        headers: { Authorization: `Bearer ${loginResponse.data.token}` }
      });
      setUser(userResponse.data);
    } catch(err) {
      console.log(err.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="form-wrapper">
        <div className="text-3xl mb-5 text-center font-bold text-gray-800">Log In</div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={handleInputChange}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={handleInputChange}
            className="input input-bordered"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Role</span>
          </label>
          <div className="flex items-center">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="role"
                value="USER"
                checked={input.role === 'USER'}
                onChange={handleInputChange}
              />
              <span className="ml-2">User</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                className="form-radio"
                name="role"
                value="ADMIN"
                checked={input.role === 'ADMIN'}
                onChange={handleInputChange}
              />
              <span className="ml-2">Admin</span>
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="btn btn-primary mt-7 px-10 py-3 rounded-lg text-white font-bold">Log In</button>
        </div>
      </form>
    </div>
  );  
}
