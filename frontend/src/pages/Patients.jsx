import { useEffect, useState } from 'react';
import axios from '../api/axios';
import "../index.css";
export default function Patients() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    fullName: '',
    ci: '',
    birthDate: '',
    phone: ''
  });

  useEffect(() => {
    axios.get('/patients').then(r => setList(r.data)).catch(() => {});
  }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/patients', form);
      const res = await axios.get('/patients');
      setList(res.data);
      setForm({ fullName: '', ci: '', birthDate: '', phone: '' });
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* TÍTULO */}
      <h3 className="text-3xl font-bold text-amber-700 mb-6">
        Gestión de Pacientes
      </h3>

      {/* CARD DEL FORMULARIO */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-amber-200 mb-10">

        <h4 className="text-xl font-semibold text-gray-700 mb-4">
          Registrar Paciente
        </h4>

        <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
            placeholder="Nombre completo"
            value={form.fullName}
            onChange={e => setForm({ ...form, fullName: e.target.value })}
          />

          <input
            className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
            placeholder="CI"
            value={form.ci}
            onChange={e => setForm({ ...form, ci: e.target.value })}
          />

          <input
            type="date"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
            value={form.birthDate}
            onChange={e => setForm({ ...form, birthDate: e.target.value })}
          />

          <input
            className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
            placeholder="Teléfono"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
          />

          <div className="md:col-span-2 flex justify-end">
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-5 rounded-lg transition">
              Crear Paciente
            </button>
          </div>

        </form>
      </div>

      {/* LISTA DE PACIENTES */}
      <h4 className="text-2xl font-semibold text-gray-700 mb-4">
        Lista de Pacientes
      </h4>

      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-amber-200">
        <table className="w-full text-left">
          <thead className="bg-amber-500 text-white">
            <tr>
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-4">CI</th>
              <th className="py-3 px-4">Teléfono</th>
              <th className="py-3 px-4">Nacimiento</th>
            </tr>
          </thead>

          <tbody>
            {list.map(p => (
              <tr key={p._id} className="border-b hover:bg-amber-50">
                <td className="py-3 px-4">{p.fullName}</td>
                <td className="py-3 px-4">{p.ci}</td>
                <td className="py-3 px-4">{p.phone}</td>
                <td className="py-3 px-4">
                  {p.birthDate ? new Date(p.birthDate).toLocaleDateString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
