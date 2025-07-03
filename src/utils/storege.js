export const getPatients = () => {
  return JSON.parse(localStorage.getItem('patients')) || [
    {
      id: 'p1',
      name: 'John Doe',
      dob: '1990-05-10',
      contact: '1234567890',
      healthInfo: 'No allergies',
    },
  ];
};

export const savePatient = (patient) => {
  const patients = getPatients();
  if (patient.id) {
    const index = patients.findIndex((p) => p.id === patient.id);
    patients[index] = patient;
  } else {
    patient.id = `p${patients.length + 1}`;
    patients.push(patient);
  }
  localStorage.setItem('patients', JSON.stringify(patients));
};

export const deletePatient = (id) => {
  const patients = getPatients().filter((p) => p.id !== id);
  localStorage.setItem('patients', JSON.stringify(patients));
};

export const getIncidents = () => {
  return JSON.parse(localStorage.getItem('incidents')) || [
    {
      id: 'i1',
      patientId: 'p1',
      title: 'Toothache',
      description: 'Upper molar pain',
      comments: 'Sensitive to cold',
      appointmentDate: '2025-07-01T10:00:00',
      cost: 80,
      status: 'Completed',
      files: [],
    },
  ];
};

export const saveIncident = (incident) => {
  const incidents = getIncidents();
  if (incident.id) {
    const index = incidents.findIndex((i) => i.id === incident.id);
    incidents[index] = incident;
  } else {
    incident.id = `i${incidents.length + 1}`;
    incidents.push(incident);
  }
  localStorage.setItem('incidents', JSON.stringify(incidents));
};

export const deleteIncident = (id) => {
  const incidents = getIncidents().filter((i) => i.id !== id);
  localStorage.setItem('incidents', JSON.stringify(incidents));
};

export const saveFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({ name: file.name, url: reader.result });
    };
    reader.readAsDataURL(file);
  });
};