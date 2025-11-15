import { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function Appointments() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ patient:'', doctor:'', date:'', time:'', reason:'' });

  useEffect(() => {
    axios.get('/patients').then(r => setPatients(r.data));
    axios.get('/medicos').then(r => setDoctors(r.data));
    fetchAppointments();
  }, []);

  function fetchAppointments() {
    const params = user?.role === 'medico' ? { doctor: user.id } : {};
    axios.get('/appointments', { params }).then(r => setAppointments(r.data));
  }

  const create = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/appointments', form);
      fetchAppointments();
      setForm({ patient:'', doctor:'', date:'', time:'', reason:'' });
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  const changeStatus = async (id, status) => {
    await axios.patch(`/appointments/${id}/status`, { status });
    fetchAppointments();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Título */}
      <h3 className="text-3xl font-bold text-amber-700 mb-6">
        Gestión de Turnos
      </h3>

      {/* Formulario solo para recepcionista */}
      {user?.role === 'recepcionista' && (
        <div className="bg-white shadow-lg rounded-xl p-6 border border-amber-200 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Imagen opcional */}
          <div className="hidden md:block">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
              alt="Appointment illustration"
              className="w-64 mx-auto opacity-90"
            />
          </div>

          {/* Formulario */}
          <form onSubmit={create} className="grid grid-cols-1 gap-4">

            <select
              className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
              value={form.patient}
              onChange={e => setForm({ ...form, patient: e.target.value })}
            >
              <option value="">Seleccionar paciente</option>
              {patients.map(p => (
                <option key={p._id} value={p._id}>{p.fullName}</option>
              ))}
            </select>

            <select
              className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
              value={form.doctor}
              onChange={e => setForm({ ...form, doctor: e.target.value })}
            >
              <option value="">Seleccionar médico</option>
              {doctors.map(d => (
                <option key={d._id} value={d._id}>{d.fullName || d.name}</option>
              ))}
            </select>

            <input
              type="date"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
            />

            <input
              type="time"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
              value={form.time}
              onChange={e => setForm({ ...form, time: e.target.value })}
            />

            <input
              placeholder="Motivo"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
              value={form.reason}
              onChange={e => setForm({ ...form, reason: e.target.value })}
            />

            <button className="bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition">
              Crear turno
            </button>
          </form>
        </div>
      )}

      {/* Tabla de turnos */}
      <h4 className="text-2xl font-semibold text-gray-700 mb-4">Lista de Turnos</h4>

      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-amber-200">
        <table className="w-full text-left">
          <thead className="bg-amber-500 text-white">
            <tr>
              <th className="py-3 px-4">Paciente</th>
              <th className="py-3 px-4">Médico</th>
              <th className="py-3 px-4">Fecha</th>
              <th className="py-3 px-4">Hora</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map(a => (
              <tr key={a._id} className="border-b hover:bg-amber-50">
                <td className="py-3 px-4">{a.patient?.fullName}</td>
                <td className="py-3 px-4">{a.doctor?.fullName || a.doctor?.name}</td>
                <td className="py-3 px-4">{a.date}</td>
                <td className="py-3 px-4">{a.time}</td>

                {/* Estado con color */}
                <td className="py-3 px-4 font-semibold">
                  {a.status === "ATENDIDO" && (
                    <span className="text-green-600">ATENDIDO</span>
                  )}
                  {a.status === "AUSENTE" && (
                    <span className="text-red-600">AUSENTE</span>
                  )}
                  {a.status === "CANCELADO" && (
                    <span className="text-gray-500">CANCELADO</span>
                  )}
                  {!["ATENDIDO","AUSENTE","CANCELADO"].includes(a.status) && (
                    <span className="text-amber-700">{a.status}</span>
                  )}
                </td>

                {/* Acciones */}
                <td className="py-3 px-4 space-x-2">
                  
                  {user?.role === 'medico' && a.status !== 'ATENDIDO' && (
                    <>
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                        onClick={() => changeStatus(a._id, 'ATENDIDO')}
                      >
                        Atendido
                      </button>

                      <button
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                        onClick={() => changeStatus(a._id, 'AUSENTE')}
                      >
                        Ausente
                      </button>
                    </>
                  )}

                  {user?.role === 'recepcionista' && (
                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded"
                      onClick={() => changeStatus(a._id, 'CANCELADO')}
                    >
                      Cancelar
                    </button>
                  )}

                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
