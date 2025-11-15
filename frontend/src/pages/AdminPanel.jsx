import { useState, useEffect } from 'react';
import axios from '../api/axios';

export default function AdminPanel(){
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name:'', username:'', password:'', role:'recepcionista' });

  useEffect(()=> { axios.get('/users').then(r=>setUsers(r.data)).catch(()=>{}); }, []);

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
    <div style={{padding:20}}>
      <h3>Panel Admin</h3>
      <form onSubmit={create}>
        <input placeholder="Nombre" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} /><br/>
        <input placeholder="username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} /><br/>
        <input placeholder="password" value={form.password} type="password" onChange={e=>setForm({...form, password:e.target.value})} /><br/>
        <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
          <option value="admin">admin</option>
          <option value="recepcionista">recepcionista</option>
          <option value="medico">medico</option>
        </select><br/>
        <button>Crear usuario</button>
      </form>

      <h4>Usuarios</h4>
      <ul>{users.map(u => <li key={u._id}>{u.name} — {u.username} — {u.role}</li>)}</ul>
    </div>
  );
}
