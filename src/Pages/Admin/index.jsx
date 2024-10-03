import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { verifyToken } from '../../utils/auth';

const Button = ({ children, onClick, variant = 'default', ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-red-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Admin = () => {
  const navigate = useNavigate();
  const [employeeName, setEmployeeName] = useState('');

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const user = await verifyToken();
        setEmployeeName(user.username);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchEmployeeData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex space-x-8 items-center">
            <img src="/512x512bb.jpg" alt="Logo" className="h-8 w-auto" />
            <nav className="flex space-x-4">
              <Link to="/" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium text-center">
                Home
              </Link>
              <Link to="/admin/list" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Employee List
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700 text-sm font-medium">{employeeName}</span>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Admin;
