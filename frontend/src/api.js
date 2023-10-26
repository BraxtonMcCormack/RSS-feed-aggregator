// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Adjust with your Django backend's URL

// Configuring axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    // Add other global axios settings if necessary
  });

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login/', credentials);
    // You might want to save the token in localStorage and set it in Axios headers here
    localStorage.setItem('token', response.data.access);
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    return response.data;
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};

// Ensure you have a function to set the token for authenticated requests
export const setAuthToken = (token) => {
    if (token) {
      // Apply the token to every request header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // Delete the auth header
      delete api.defaults.headers.common['Authorization'];
    }
  };
  
  export const fetchFeeds = async () => {
    try {
      const response = await api.get('/feeds/');
      return response.data;
    } catch (error) {
      console.error('Error fetching feeds', error);
      throw error;
    }
  };
// Add more API functions as needed
