import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth endpoints
export const login = async (credentials) => {
  const response = await apiClient.post('/auth/login', {
    username: credentials.username,
    password: credentials.password,
  });
  return response.data;
};

export const getUserProfile = async (token) => {
  const response = await apiClient.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getProducts = async () => {
  const response = await apiClient.get('/products');
  return response.data;
};

export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await apiClient.get(`/products/search?q=${query}`);
  return response.data;
};

