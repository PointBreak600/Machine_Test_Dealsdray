import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const auth = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
});

export const LoginEmployee = (credentials) => {
    return auth.post('/login', credentials);
};

export const verifyToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token provided");

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            throw new Error("Token expired");
        }

        const response = await auth.get('/verify', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Token invalid or expired");
    }
};

export default auth;