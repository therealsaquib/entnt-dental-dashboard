import { useState, useEffect, useContext } from 'react';
import { getPatients, savePatient, deletePatient } from '../utils/storege';
import { AuthContext } from '../contexts/AuthContext';

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', dob: '', contact: '', healthInfo: '' });
  const [isEditing, setIsEditing] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    setPatients(getPatients());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    savePatient(form);
    setPatients(getPatients());
    setForm({ id: '', name: '', dob: '', contact: '', healthInfo: '' });
    setIsEditing(false);
  };

  const handleEdit = (patient) => {
    setForm(patient);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    deletePatient(id);
    setPatients(getPatients());
  };

  return (
    <div className="section-bg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Patient Management</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 gap-6">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
            className="p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Contact"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Health Info"
            value={form.healthInfo}
            onChange={(e) => setForm({ ...form, healthInfo: e.target.value })}
            className="p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg font-semibold transition-all duration-200 hover:bg-blue-700"
          >
            {isEditing ? 'Update' : 'Add'} Patient
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 gap-6">
        {patients.map((patient) => (
          <div key={patient.id} className="p-4 border border-blue-200 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-lg font-medium"><strong>Name:</strong> {patient.name}</p>
              <p><strong>DOB:</strong> {patient.dob}</p>
              <p><strong>Contact:</strong> {patient.contact}</p>
              <p><strong>Health Info:</strong> {patient.healthInfo}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(patient)}
                className="bg-yellow-500 text-white p-2 rounded-lg mr-2 transition-all duration-200 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(patient.id)}
                className="bg-red-500 text-white p-2 rounded-lg transition-all duration-200 hover:bg-red-600"
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

export default PatientManagement;