import { useState, useEffect } from 'react';
import { Button, Input, Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components";
import { verifyToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { LoginEmployee } from '../../utils/auth';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const verify = async () => {
        try {
          await verifyToken();
          navigate('/admin');
        } catch (error) {
          console.error('Token verification failed:', error);
        }
      };
      verify();
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await LoginEmployee({ username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center mb-6">
        <img src='/512x512bb.jpg' alt="Company Logo" className="h-16 mx-auto" />
        <h2 className="mt-2 text-lg font-semibold">A Unique B2B Platform for Mobile Retailers, Wholesalers, and Distributors</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Username
            </label>
            <Input
              id="username"
              placeholder="Enter your username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin}>Log In</Button>
        </CardFooter>
      </Card>
    </div>
  )
}