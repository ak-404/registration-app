import { useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    message: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear previous error when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!formData.role) {
      setError("Please select a role");
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid phone number");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axios.post(API_ENDPOINTS.REGISTER, formData);
      setSuccess(response.data.msg || "Registration successful!");
      setFormData({ name: "", email: "", phone: "", role: "", message: "" });
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "Error registering. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Join Our Team</h2>
          <p>Register as an Intern or Volunteer at Basti Ki Pathshala Foundation</p>
        </div>
        
        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input 
              id="name"
              name="name" 
              type="text"
              placeholder="Enter your full name" 
              value={formData.name} 
              onChange={handleChange} 
              disabled={isLoading}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input 
              id="email"
              name="email" 
              type="email" 
              placeholder="Enter your email address" 
              value={formData.email} 
              onChange={handleChange} 
              disabled={isLoading}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input 
              id="phone"
              name="phone" 
              type="tel"
              placeholder="Enter your phone number" 
              value={formData.phone} 
              onChange={handleChange} 
              disabled={isLoading}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Role *</label>
            <select 
              id="role"
              name="role" 
              onChange={handleChange} 
              value={formData.role} 
              disabled={isLoading}
              required
            >
              <option value="">Select your preferred role</option>
              <option value="Intern">Intern</option>
              <option value="Volunteer">Volunteer</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Why do you want to join us?</label>
            <textarea 
              id="message"
              name="message" 
              placeholder="Tell us about your motivation and what you hope to contribute..." 
              value={formData.message} 
              onChange={handleChange} 
              disabled={isLoading}
              rows="4"
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;