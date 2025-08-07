import { useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

const Login = ({ setIsAdminAuthenticated }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (!credentials.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!credentials.password) {
      setError("Password is required");
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, credentials);
      
      if (response.data.token) {
        // Store token in localStorage for future requests
        localStorage.setItem('adminToken', response.data.token);
        setIsAdminAuthenticated(true);
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "Invalid credentials. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Admin Login</h2>
          <p>Access the admin dashboard to view applications</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              id="email"
              name="email" 
              type="email" 
              placeholder="Enter your email address" 
              value={credentials.email} 
              onChange={handleChange} 
              disabled={isLoading}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              value={credentials.password} 
              onChange={handleChange} 
              disabled={isLoading}
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;