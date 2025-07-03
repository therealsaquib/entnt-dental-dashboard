import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getIncidents, getPatients } from '../utils/storege';
import { format } from 'date-fns';

const PatientView = () => {
  const { user, logout } = useContext(AuthContext);
  const [patient, setPatient] = useState(null);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const patients = getPatients();
    const patientData = patients.find((p) => p.id === user.patientId);
    setPatient(patientData);
    setIncidents(getIncidents().filter((i) => i.patientId === user.patientId));
  }, [user]);

  return (
    <div className="section-bg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Patient Dashboard</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      {patient && (
        <div className="mb-8 p-6 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Profile</h3>
          <p className="text-lg"><strong>Name:</strong> {patient.name}</p>
          <p className="text-lg"><strong>DOB:</strong> {patient.dob}</p>
          <p className="text-lg"><strong>Contact:</strong> {patient.contact}</p>
          <p className="text-lg"><strong>Health Info:</strong> {patient.healthInfo}</p>
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4">Upcoming Appointments</h3>
      <div className="grid grid-cols-1 gap-6 mb-8">
        {(Array.isArray(incidents) ? incidents : [])
          .filter((i) => new Date(i.appointmentDate) > new Date() && i.status === 'Pending')
          .map((incident) => (
            <div key={incident.id} className="p-6 border rounded-lg shadow-md bg-white">
              <p className="text-lg font-semibold"><strong>Title:</strong> {incident.title}</p>
              <p className="text-md"><strong>Date:</strong> {format(new Date(incident.appointmentDate), 'MMMM d, yyyy HH:mm')}</p>
              <p className="text-md"><strong>Status:</strong> {incident.status}</p>
            </div>
          ))}
      </div>
      <h3 className="text-2xl font-bold mb-4">Appointment History</h3>
      <div className="grid grid-cols-1 gap-6">
        {(Array.isArray(incidents) ? incidents : [])
          .filter((i) => i.status === 'Completed')
          .map((incident) => (
            <div key={incident.id} className="p-6 border rounded-lg shadow-md bg-white">
              <p className="text-lg font-semibold"><strong>Title:</strong> {incident.title}</p>
              <p className="text-md"><strong>Date:</strong> {format(new Date(incident.appointmentDate), 'MMMM d, yyyy HH:mm')}</p>
              <p className="text-md"><strong>Cost:</strong> ${incident.cost}</p>
              <p className="text-md"><strong>Files:</strong></p>
              {(Array.isArray(incident.files) ? incident.files : []).map((file, index) => (
                <a
                  key={index}
                  href={file.url}
                  download={file.name}
                  className="text-blue-500 underline"
                >
                  {file.name}
                </a>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PatientView;