import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function Patients(){
  const [list,setList]=useState([]);
  const [form,setForm]=useState({fullName:'',ci:'',birthDate:'',phone:''});

  useEffect(()=>{ axios.get('/patients').then(r=>setList(r.data)).catch(()=>{}); },[]);

  const create = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/patients', form);
      const res = await axios.get('/patients');
      setList(res.data);
      setForm({fullName:'',ci:'',birthDate:'',phone:''});
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <div style={{padding:20}}>
      <h3>Pacientes</h3>
      <form onSubmit={create}>
        <input placeholder="Nombre completo" value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} /><br/>
        <input placeholder="CI" value={form.ci} onChange={e=>setForm({...form, ci:e.target.value})} /><br/>
        <input type="date" value={form.birthDate} onChange={e=>setForm({...form, birthDate:e.target.value})} /><br/>
        <input placeholder="Teléfono" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} /><br/>
        <button>Crear</button>
      </form>

      <ul>
        {list.map(p => <li key={p._id}>{p.fullName} — {p.ci} — {p.phone}</li>)}
      </ul>
    </div>
  );
}
