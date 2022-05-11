import { decodeToken, isExpired } from "react-jwt";

const LOCAL_STORAGE_AUTH_KEY = process.env.REACT_APP_LOCAL_STORAGE_AUTH_KEY;

export const getToken = () => localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

export const saveUser = (token) => {
  // save JWT in local storage
  return localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, token);
};

export const getUser = () => {
  try {
    const token = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
    const decodedToken = decodeToken(token);
    const isTokenExpired = isExpired(token);
    if (isTokenExpired) return null;
    return decodedToken;
  } catch (error) {
    return null;
  }
};

export const handleLogout = (navigate) => {
  localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
  navigate("/auth");
};
