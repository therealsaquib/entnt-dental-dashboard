import { useState, useEffect } from 'react';
import { getIncidents, saveIncident, deleteIncident, saveFile } from '../utils/storege';
import { getPatients } from '../utils/storege';

const IncidentManagement = () => {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    id: '',
    patientId: '',
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    status: 'Pending',
    files: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIncidents(getIncidents());
    setPatients(getPatients());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFiles = [];
    for (const file of form.files) {
      if (file instanceof File) {
        const savedFile = await saveFile(file);
        newFiles.push(savedFile);
      } else {
        newFiles.push(file);
      }
    }
    saveIncident({ ...form, files: newFiles });
    setIncidents(getIncidents());
    setForm({
      id: '',
      patientId: '',
      title: '',
      description: '',
      comments: '',
      appointmentDate: '',
      cost: '',
      status: 'Pending',
      files: [],
    });
    setIsEditing(false);
  };

  const handleEdit = (incident) => {
    setForm(incident);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    deleteIncident(id);
    setIncidents(getIncidents());
  };

  return (
    <div className="section-bg">
      <h2 className="section-title">Incident Management</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 gap-6">
          <select
            value={form.patientId}
            onChange={(e) => setForm({ ...form, patientId: e.target.value })}
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Patient</option>
            {(Array.isArray(patients) ? patients : []).map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Comments"
            value={form.comments}
            onChange={(e) => setForm({ ...form, comments: e.target.value })}
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="datetime-local"
            value={form.appointmentDate}
            onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            placeholder="Cost"
            value={form.cost}
            onChange={(e) => setForm({ ...form, cost: e.target.value })}
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="file"
            multiple
            onChange={(e) => setForm({ ...form, files: [...form.files, ...e.target.files] })}
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg shadow-md hover:bg-blue-700 transition-all">
            {isEditing ? 'Update' : 'Add'} Incident
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 gap-6">
        {(Array.isArray(incidents) ? incidents : []).map((incident) => (
          <div key={incident.id} className="p-4 border rounded-lg shadow-md flex justify-between bg-white">
            <div>
              <p className="font-semibold text-lg"><strong>Title:</strong> {incident.title}</p>
              <p><strong>Patient:</strong> {(Array.isArray(patients) ? patients : []).find(p => p.id === incident.patientId)?.name}</p>
              <p><strong>Date:</strong> {incident.appointmentDate}</p>
              <p><strong>Status:</strong> {incident.status}</p>
              <p><strong>Files:</strong> {(Array.isArray(incident.files) ? incident.files : []).map(f => f.name).join(', ')}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleEdit(incident)}
                className="bg-yellow-500 text-white p-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(incident.id)}
                className="bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentManagement;