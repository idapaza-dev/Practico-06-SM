import { useState, useEffect } from 'react';
import axios from '../api/axios';
import "../index.css";
export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name:'', username:'', password:'', role:'recepcionista' });

  useEffect(() => { 
    axios.get('/users')
      .then(r => setUsers(r.data))
      .catch(() => {});
  }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/users', form);
      const r = await axios.get('/users');
      setUsers(r.data);
      setForm({ name:'', username:'', password:'', role:'recepcionista' });
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      
      {/* Título */}
      <h3 className="text-3xl font-bold text-amber-700 mb-6">
        Panel de Administración
      </h3>

      {/* Formulario en tarjeta */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 border border-amber-200">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Crear nuevo usuario</h4>

        <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input 
            className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            placeholder="Nombre"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input 
            className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            placeholder="Usuario"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
          />

          <input 
            type="password"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            placeholder="Contraseña"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <select
            className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="recepcionista">Recepcionista</option>
            <option value="medico">Médico</option>
          </select>

          {/* Botón ocupa toda la fila */}
          <div className="md:col-span-2">
            <button
              className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
            >
              Crear usuario
            </button>
          </div>
        </form>
      </div>

      {/* Lista de usuarios */}
      <h4 className="text-2xl font-semibold text-gray-700 mb-4">Usuarios existentes</h4>

      <div className="bg-white shadow-md rounded-lg border border-amber-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-amber-500 text-white">
            <tr>
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-4">Usuario</th>
              <th className="py-3 px-4">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-b hover:bg-amber-50">
                <td className="py-3 px-4">{u.name}</td>
                <td className="py-3 px-4">{u.username}</td>
                <td className="py-3 px-4 capitalize">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
