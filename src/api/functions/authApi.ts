import { authAxiosInstance } from "../axiosInstance"; // Corrected import
import { endpoints } from "../endpoints";

// Login function
export const login = async (credentials: any) => {
  try {
    const response = await authAxiosInstance.post(endpoints.login, credentials);
    // Assuming the response contains user data
    if (response.data) {
      // Set a cookie with the user data
      document.cookie = `user=${JSON.stringify(response.data)}; path=/;`; // Set cookie
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Ensure to throw the error for handling
  }
};

// Signup function
export const signup = async (userData: any) => {
  try {
    const response = await authAxiosInstance.post(endpoints.signup, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Ensure to throw the error for handling
  }
};

// Logout function
export const logout = () => {
  // Clear the cookie by setting its expiration date to a past date
  document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};
