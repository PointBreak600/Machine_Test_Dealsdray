import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getEmployees = () => api.get('/employees');
export const getEmployee = (id) => api.get(`/employees/${id}`);
export const createEmployee = (employeeData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  return api.post('/employees', employeeData, config);
};
export const updateEmployee = (id, employeeData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  return api.patch(`/employees/${id}`, employeeData, config);
};
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

export default api;