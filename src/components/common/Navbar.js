import React, { useContext, useState } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = user && user.role === 'Admin'
    ? [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/patients", label: "Patients" },
        { to: "/incidents", label: "Incidents" },
        { to: "/calendar", label: "Calendar" }
      ]
    : user
      ? [{ to: "/patient-view", label: "Patient View" }]
      : [];

  const MenuIcon = (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6"/>
      <line x1="4" y1="12" x2="20" y2="12"/>
      <line x1="4" y1="18" x2="20" y2="18"/>
    </svg>
  );
  const XIcon = (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
        
          <Link to="/" className="flex-shrink-0 flex items-center text-blue-600 text-2xl font-bold">
            ENTNT<span className="text-gray-600">Dental</span>
          </Link>
         
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
         
          {user && (
            <div className="hidden md:flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/40"
                alt="User"
                className="w-9 h-9 rounded-full border-2 border-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">{user.name || "Dr.Admin"}</span>
              <button
                onClick={handleLogout}
                className="text-blue-700 hover:bg-blue-100 px-3 py-1 rounded transition font-semibold"
              >
                Logout
              </button>
            </div>
          )}
      
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? XIcon : MenuIcon}
            </button>
          </div>
        </div>
      </div>
     
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-white shadow-sm">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <div className="mt-4 border-t pt-3 flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40"
                alt="User"
                className="w-9 h-9 rounded-full border-2 border-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">{user.name || "John"}</span>
              <button
                onClick={() => { setIsOpen(false); handleLogout(); }}
                className="text-blue-700 hover:bg-blue-100 px-3 py-1 rounded transition font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;