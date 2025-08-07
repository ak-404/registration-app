import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsAdminAuthenticated(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminAuthenticated(false);
    window.location.reload();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <h1>Basti Ki Pathshala</h1>
          <span className="brand-subtitle">Foundation</span>
        </Link>
      </div>
      
      <div className="navbar-menu">
        <div className="navbar-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/register" 
            className={`nav-link ${isActive('/register') ? 'active' : ''}`}
          >
            Apply
          </Link>
          
          {isAdminAuthenticated ? (
            <>
              <Link 
                to="/admin" 
                className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="nav-button logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className={`nav-link ${isActive('/login') ? 'active' : ''}`}
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;