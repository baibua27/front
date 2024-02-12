import axios from 'axios';
import { useState } from "react";

export default function RegisterForm() {
  const [input, setInput] = useState({
    name: '', 
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER', // Set the role to 'USER'
    phone: ''
  });

  const handleInputChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      // Check for password confirmation
      if (input.password !== input.confirmPassword) {
        return alert('Please check confirm password');
      }
      // Send data to the server
      const response = await axios.post('http://localhost:3000/auth/register', input);
      console.log(response);
      if (response.status === 200) {
        alert('Register Successful');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="form-container">
      <div className="p-5 border w-full max-w-md rounded mt-5 bg-white">
        <div className="text-xl mb-3 text-center font-bold text-gray-800">ลงทะเบียน</div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="form-control">
            <span className="label-text">Username</span>
            <input
              type="text"
              className="input input-bordered"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </label>
          <label className="form-control">
            <span className="label-text">E-mail</span>
            <input
              type="email"
              className="input input-bordered"
              name="email"
              value={input.email}
              onChange={handleInputChange}
            />
          </label>
          <label className="form-control">
            <span className="label-text">Password</span>
            <input
              type="password"
              className="input input-bordered"
              name="password"
              value={input.password}
              onChange={handleInputChange}
            />
          </label>
          <label className="form-control">
            <span className="label-text">Confirm Password</span>
            <input
              type="password"
              className="input input-bordered"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={handleInputChange}
            />
          </label>
          <label className="form-control">
            <span className="label-text">Phone</span>
            <input
              type="text"
              className="input input-bordered"
              name="phone"
              value={input.phone}
              onChange={handleInputChange}
            />
          </label>
          <div className="flex justify-center">
            <button type="submit" className="btn btn-primary mt-3 px-8 py-3 rounded-md text-white font-bold">Submit</button>
            <button type="reset" className="btn btn-warning mt-3 px-8 py-3 rounded-md text-white font-bold">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}
