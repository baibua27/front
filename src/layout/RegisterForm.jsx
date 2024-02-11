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
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5 ">
      <div className="text-3xl mb-5">Register Form</div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="name"
            value={input.name}
            onChange={handleInputChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">E-mail</span>
          </div>
          <input
            type="email"
            className="input input-bordered w-full max-w-xs"
            name="email"
            value={input.email}
            onChange={handleInputChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="password"
            value={input.password}
            onChange={handleInputChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Confirm Password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={handleInputChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Phone</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="phone"
            value={input.phone}
            onChange={handleInputChange}
          />
        </label>
        <div className="flex gap-5 ">
          <button type="submit" className="btn btn-outline btn-info mt-7">Submit</button>
          <button type="reset" className="btn btn-outline btn-warning mt-7">Reset</button>
        </div>
      </form>
    </div>
  );
}
