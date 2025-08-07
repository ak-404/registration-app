import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

const Admin = () => {
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError("No authentication token found. Please login again.");
        return;
      }

      const response = await axios.get(API_ENDPOINTS.GET_APPLICANTS, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setApplicants(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "Failed to fetch applicants. Please try again.";
      setError(errorMessage);
      
      // If unauthorized, clear token and redirect to login
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteApplicant = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the application from ${name}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_ENDPOINTS.GET_APPLICANTS}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Remove from local state
      setApplicants(applicants.filter(applicant => applicant._id !== id));
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "Failed to delete applicant.";
      alert(errorMessage);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.reload(); // Reload to reset authentication state
  };

  if (isLoading) {
    return (
      <div className="admin-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading applicants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h2>Admin Dashboard</h2>
          <p>Manage intern and volunteer applications</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={fetchApplicants} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      <div className="applicants-section">
        <div className="section-header">
          <h3>Applications ({applicants.length})</h3>
          <button onClick={fetchApplicants} className="refresh-btn">
            Refresh
          </button>
        </div>

        {applicants.length === 0 ? (
          <div className="no-applicants">
            <p>No applications received yet.</p>
          </div>
        ) : (
          <div className="applicants-table-container">
            <table className="applicants-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Applied Date</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant) => (
                  <tr key={applicant._id}>
                    <td className="name-cell">
                      <strong>{applicant.name}</strong>
                    </td>
                    <td className="email-cell">
                      <a href={`mailto:${applicant.email}`}>
                        {applicant.email}
                      </a>
                    </td>
                    <td className="phone-cell">
                      <a href={`tel:${applicant.phone}`}>
                        {applicant.phone}
                      </a>
                    </td>
                    <td className="role-cell">
                      <span className={`role-badge ${applicant.role.toLowerCase()}`}>
                        {applicant.role}
                      </span>
                    </td>
                    <td className="date-cell">
                      {formatDate(applicant.createdAt)}
                    </td>
                    <td className="message-cell">
                      {applicant.message ? (
                        <div className="message-content">
                          {applicant.message.length > 100 ? 
                            `${applicant.message.substring(0, 100)}...` : 
                            applicant.message
                          }
                        </div>
                      ) : (
                        <span className="no-message">No message</span>
                      )}
                    </td>
                    <td className="actions-cell">
                      <button 
                        onClick={() => handleDeleteApplicant(applicant._id, applicant.name)}
                        className="delete-btn"
                        title="Delete application"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;