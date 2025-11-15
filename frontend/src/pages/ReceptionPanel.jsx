import Patients from './Patients';
import Appointments from './Appointments';
import "../index.css";
export default function ReceptionPanel() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      
      {/* TÍTULO DEL PANEL */}
      <h2 className="text-4xl font-bold text-amber-700 mb-6">
        Panel Recepcionista
      </h2>

      {/* SECCIÓN PACIENTES */}
      <div className="bg-white shadow-lg rounded-xl border border-amber-200 p-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Gestión de Pacientes
        </h3>
        <Patients />
      </div>

      {/* SECCIÓN TURNOS */}
      <div className="bg-white shadow-lg rounded-xl border border-amber-200 p-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Gestión de Turnos
        </h3>
        <Appointments />
      </div>
      
    </div>
  );
}
