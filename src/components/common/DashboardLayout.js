import React, { useState } from "react";
import { Link } from "react-router-dom";


const LayoutDashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="9" rx="2" /><rect x="14" y="3" width="7" height="5" rx="2" />
    <rect x="14" y="12" width="7" height="9" rx="2" /><rect x="3" y="16" width="7" height="5" rx="2" />
  </svg>
);
const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-3-3.87"/><path d="M9 21v-2a4 4 0 0 1 3-3.87"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>
  </svg>
);
const FileTextIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);
const LogOutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
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

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard" },
    { name: "Patients", icon: UsersIcon, path: "/patients" },
    { name: "Appointments", icon: CalendarIcon, path: "/appointments" },
    { name: "Reports", icon: FileTextIcon, path: "/reports" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      <aside
        className={`bg-white shadow-lg border-r border-gray-200 fixed z-40 md:static inset-y-0 left-0 w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-center h-16 font-bold text-2xl text-blue-600 border-b">
          ENTNT<span className="text-gray-700">Dental</span>
        </div>
        <nav className="mt-4 px-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 text-gray-700 py-3 px-4 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all font-medium"
            >
              <item.icon />
              {item.name}
            </Link>
          ))}

          <button className="flex items-center gap-3 mt-8 text-sm text-red-600 py-2 px-4 hover:bg-red-50 rounded-lg w-full transition">
            <LogOutIcon />
            Logout
          </button>
        </nav>
      </aside>

     
      <div className="flex-1 flex flex-col min-h-screen pl-0 md:pl-64">
    
        <header className="flex items-center justify-between bg-white h-16 px-4 md:px-8 border-b shadow-sm sticky top-0 z-30">
          <button
            className="md:hidden text-gray-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? XIcon : MenuIcon}
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/300"
              className="w-9 h-9 rounded-full border-2 border-blue-500"
              alt="avatar"
            />
            <span className="hidden md:block text-sm font-medium text-gray-700">Dr. Admin</span>
          </div>
        </header>

       
        <main className="flex-1 bg-gray-50 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
