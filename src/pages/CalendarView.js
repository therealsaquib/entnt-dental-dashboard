import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from 'date-fns';
import { getIncidents, getPatients } from '../utils/storege';

const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setIncidents(getIncidents());
    setPatients(getPatients());
  }, []);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="section-bg">
      <h2 className="section-title">Calendar View</h2>
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
        >
          Previous
        </button>
        <h3 className="text-2xl font-semibold text-center md:text-left">{format(currentMonth, 'MMMM yyyy')}</h3>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {days.map((day) => (
          <div
            key={day}
            className={`p-4 border text-center cursor-pointer rounded-lg transition-all duration-300 ${
              selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                ? 'bg-blue-200 shadow-inner'
                : ''
            }`}
            onClick={() => handleDateClick(day)}
          >
            <div className="text-lg font-medium">{format(day, 'd')}</div>
            {incidents.some(
              (i) => format(new Date(i.appointmentDate), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
            ) && <div className="h-2 w-2 bg-red-500 rounded-full mx-auto mt-1"></div>}
          </div>
        ))}
      </div>
      {selectedDate && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">
            Appointments on {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          {incidents
            .filter(
              (i) => format(new Date(i.appointmentDate), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
            )
            .map((incident) => (
              <div key={incident.id} className="p-4 border rounded-lg mt-2 shadow-md bg-white">
                <p className="text-md font-semibold"><strong>Title:</strong> {incident.title}</p>
                <p className="text-md"><strong>Patient:</strong> {patients.find(p => p.id === incident.patientId)?.name}</p>
                <p className="text-md"><strong>Time:</strong> {format(new Date(incident.appointmentDate), 'HH:mm')}</p>
                <p className="text-md"><strong>Status:</strong> {incident.status}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CalendarView;