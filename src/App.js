import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientManagement from './pages/PatientManagement';
import IncidentManagement from './pages/IncidentManagment';
import CalendarView from './pages/CalendarView';
import PatientView from './pages/PatientView';
import Navbar from './components/common/Navbar';
import './App.css';

const PrivateRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  return user && user.role === role ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 antialiased">
      <Router>
        <Navbar />
        <div className="max-w-5xl mx-auto w-full px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute role="Admin">
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/patients"
              element={
                <PrivateRoute role="Admin">
                  <PatientManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/incidents"
              element={
                <PrivateRoute role="Admin">
                  <IncidentManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <PrivateRoute role="Admin">
                  <CalendarView />
                </PrivateRoute>
              }
            />
            <Route
              path="/patient-view"
              element={
                <PrivateRoute role="Patient">
                  <PatientView />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;