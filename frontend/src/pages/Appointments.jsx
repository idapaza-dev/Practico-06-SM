import { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function Appointments(){
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ patient:'', doctor:'', date:'', time:'', reason:'' });

  useEffect(()=> {

    // Pacientes
    axios.get('/patients')
      .then(r => setPatients(r.data))
      .catch(()=>{});

    // Doctores (solo usuarios con role === 'medico')
   axios.get('/medicos').then(r => setDoctors(r.data));

    fetchAppointments();
  }, []);

  function fetchAppointments(){
    const params = user?.role === 'medico' ? { doctor: user.id } : {};
    axios.get('/appointments', { params })
      .then(r => setAppointments(r.data))
      .catch(()=>{});
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
    try {
      await axios.patch(`/appointments/${id}/status`, { status });
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <div style={{padding:20}}>
      <h3>Turnos</h3>

      {/* Form: only recepcionista can create */}
      {user?.role === 'recepcionista' && (
        <form onSubmit={create}>
          <select 
            value={form.patient} 
            onChange={e=>setForm({...form, patient:e.target.value})}>
            <option value="">Seleccionar paciente</option>
            {patients.map(p => (
              <option key={p._id} value={p._id}>
                {p.fullName}
              </option>
            ))}
          </select><br/>

          <select 
            value={form.doctor} 
            onChange={e=>setForm({...form, doctor:e.target.value})}>
            <option value="">Seleccionar médico</option>
            {doctors.map(d => (
              <option key={d._id} value={d._id}>
                {d.fullName || d.name}
              </option>
            ))}
          </select><br/>

          <input 
            type="date" 
            value={form.date} 
            onChange={e=>setForm({...form, date:e.target.value})} 
          /><br/>

          <input 
            type="time" 
            value={form.time} 
            onChange={e=>setForm({...form, time:e.target.value})} 
          /><br/>

          <input 
            placeholder="Motivo" 
            value={form.reason} 
            onChange={e=>setForm({...form, reason:e.target.value})} 
          /><br/>

          <button>Crear turno</button>
        </form>
      )}

      <h4>Lista de turnos</h4>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr key={a._id}>
              <td>{a.patient?.fullName}</td>
              <td>{a.doctor?.fullName || a.doctor?.name}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>
              <td>{a.status}</td>
              <td>
                {user?.role === 'medico' && a.status !== 'ATENDIDO' && (
                  <>
                    <button onClick={()=>changeStatus(a._id, 'ATENDIDO')}>Marcar ATENDIDO</button>
                    <button onClick={()=>changeStatus(a._id, 'AUSENTE')}>Marcar AUSENTE</button>
                  </>
                )}

                {user?.role === 'recepcionista' && (
                  <button onClick={()=>changeStatus(a._id, 'CANCELADO')}>
                    Cancelar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
