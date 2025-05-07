import { useState } from 'react';
import axios from 'axios';
import '../styles/register.css';
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter(); // ✅ This line was missing
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/register', formData);
      setMessage(res.data.message);
      router.push("/login"); // ✅ Redirects after successful registration
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className='body'>
      <h2>Register</h2><br/><br/>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} /><br/>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} /><br/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br/>
        <button type="submit">Register</button>
      </form>
      <br/>
      <p>{message}</p>
    </div>
  );
}
