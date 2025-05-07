import { useState , useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../styles/login.css';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, []);
  
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', formData); // ✅ Adjust this URL to your backend
      const { token } = res.data;

      // ✅ Save token in localStorage
      localStorage.setItem('token', token);

      setMessage('Login successful ✅ Redirecting...');
      
        router.push('/dashboard'); // ✅ Redirect after login
      
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed ❌');
    }
  };

  return (
    <div className='body'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
