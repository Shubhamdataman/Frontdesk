// AuthContext.js
import axios from "axios";
import React, { createContext, useState, useContext} from "react";

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const loginAPI ="http://channelmanager.dataman.in/dcmUAT/dcm/master/api/server/ValidateUser";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null); // Add state for username

  // Function to log in
  const login = async (userName, password) => {
    let payload = {
      user_Name: userName,
      password: password,
    };

    try {
      const res = await axios.post(loginAPI, payload);
      let status = res.data?.Status;

      if (status === "Success") {
        setIsAuthenticated(true);
        setUsername(userName); // Set the username
        localStorage.setItem('userName', userName); // Save username to local storage
        return { success: true };
      } else if (status === "Fail") {
        return { success: false, message: res.data?.Message || "Enter valid credentials" };
      }
    } catch (error) {
      console.error("error in Login: " + error);
      return { success: false, message: "Error in login process" };
    }
  };

  // Function to log out
  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    localStorage.removeItem('userName'); // Clear username from local storage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}