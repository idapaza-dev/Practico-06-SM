import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axios';
import "../index.css";
export default function DoctorPanel() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const params = user?.role === 'medico' ? { doctor: user.id } : {};
        const res = await axios.get('/appointments', { params });
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [user]);

  const changeStatus = async (id, status) => {
    try {
      await axios.patch(`/appointments/${id}/status`, { status });
      setAppointments(prev =>
        prev.map(a => (a._id === id ? { ...a, status } : a))
      );
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">

      {/* TÍTULO DEL PANEL */}
      <h2 className="text-4xl font-bold text-amber-700 mb-6">
        Panel Médico
      </h2>

      {/* TURNOS */}
      <div className="bg-white shadow-lg rounded-xl border border-amber-200 p-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Lista de Turnos
        </h3>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          appointments.length === 0 ? (
            <p className="text-gray-500">No hay turnos disponibles.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead className="bg-amber-200">
                  <tr>
                    <th className="p-2 border">Paciente</th>
                    <th className="p-2 border">Fecha</th>
                    <th className="p-2 border">Hora</th>
                    <th className="p-2 border">Motivo</th>
                    <th className="p-2 border">Estado</th>
                    <th className="p-2 border">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(a => (
                    <tr key={a._id} className="bg-white border-b">
                      <td className="p-2 border">{a.patient?.fullName}</td>
                      <td className="p-2 border">{a.date}</td>
                      <td className="p-2 border">{a.time}</td>
                      <td className="p-2 border">{a.reason}</td>
                      <td className="p-2 border">
                        <span className={`px-2 py-1 rounded-full text-white ${
                          a.status === 'ATENDIDO' ? 'bg-green-500' :
                          a.status === 'AUSENTE' ? 'bg-red-500' :
                          'bg-yellow-500'
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="p-2 border space-x-2">
                        {a.status !== 'ATENDIDO' && (
                          <>
                            <button
                              onClick={() => changeStatus(a._id, 'ATENDIDO')}
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                              Marcar ATENDIDO
                            </button>
                            <button
                              onClick={() => changeStatus(a._id, 'AUSENTE')}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Marcar AUSENTE
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}
