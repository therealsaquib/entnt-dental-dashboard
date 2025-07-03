import { useEffect, useState } from 'react';
import { getIncidents, getPatients } from '../utils/storege';
import { format } from 'date-fns';
import Navbar from '../components/common/Navbar';

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);
  const [kpis, setKpis] = useState({
    upcoming: 0,
    completed: 0,
    revenue: 0,
    topPatients: [],
  });

  useEffect(() => {
    const incidents = getIncidents();
    const patients = getPatients();
    setIncidents(incidents);
    setPatients(patients);

    const upcoming = incidents.filter(
      (i) => new Date(i.appointmentDate) > new Date() && i.status === 'Pending'
    ).length;
    const completed = incidents.filter((i) => i.status === 'Completed').length;
    const revenue = incidents.reduce((sum, i) => sum + (parseFloat(i.cost) || 0), 0);
    const patientIncidents = patients.map((p) => ({
      name: p.name,
      count: incidents.filter((i) => i.patientId === p.id).length,
    }));
    const topPatients = patientIncidents.sort((a, b) => b.count - a.count).slice(0, 3);

    setKpis({ upcoming, completed, revenue, topPatients });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="section-bg">
        <h2 className="section-title">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-bold text-blue-700">Upcoming Appointments</h3>
            <p className="text-3xl font-extrabold">{kpis.upcoming}</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-bold text-green-700">Completed Treatments</h3>
            <p className="text-3xl font-extrabold">{kpis.completed}</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-bold text-yellow-700">Total Revenue</h3>
            <p className="text-3xl font-extrabold">${kpis.revenue}</p>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-blue-700">Next 10 Appointments</h3>
        <div className="grid grid-cols-1 gap-4">
          {incidents
            .filter((i) => new Date(i.appointmentDate) > new Date())
            .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
            .slice(0, 10)
            .map((incident) => (
              <div key={incident.id} className="p-4 border rounded">
                <p><strong>Title:</strong> {incident.title}</p>
                <p><strong>Patient:</strong> {patients.find(p => p.id === incident.patientId)?.name}</p>
                <p><strong>Date:</strong> {format(new Date(incident.appointmentDate), 'MMMM d, yyyy HH:mm')}</p>
              </div>
            ))}
        </div>
        <h3 className="text-2xl font-bold mt-6 mb-4 text-blue-700">Top Patients</h3>
        <div className="grid grid-cols-1 gap-4">
          {kpis.topPatients.map((p) => (
            <div key={p.name} className="p-4 border rounded">
              <p><strong>Name:</strong> {p.name}</p>
              <p><strong>Appointments:</strong> {p.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;