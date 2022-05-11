import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const register = (user) =>
  axios.post(`${API_URL}/api/auth/register`, user);

export const login = (user) => axios.post(`${API_URL}/api/auth/login`, user);

export const verify = ({ userId, otp }) =>
  axios.post(`${API_URL}/api/auth/verify`, { userId, otp });

export const fetchUserDetails = (token) =>
  axios.get(`${API_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const uploadImage = (formData) =>
  axios.post(`${API_URL}/file/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const retrieveUserMemories = (token) =>
  axios.get(`${API_URL}/api/memory/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllPublicMemories = (token) =>
  axios.get(`${API_URL}/api/memory`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createMemory = (memory, token) =>
  axios.post(`${API_URL}/api/memory`, memory, {
    headers: { Authorization: `Bearer ${token}` },
  });
