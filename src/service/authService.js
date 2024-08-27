import axios from 'axios';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      return token;
    } catch (err) {
      console.error('Login failed', err);
      throw err;
    }
  },

  getUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const response = await axios.get('http://localhost:5000/api/auth/getUserInfo',{
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.user;
    } catch (err) {
      console.error('Failed to fetch user information', err);
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export default authService;
