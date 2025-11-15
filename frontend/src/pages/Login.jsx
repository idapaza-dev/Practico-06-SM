import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login(){
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const u = await login(username, password);
      if (u.role === 'admin') nav('/admin');
      else if (u.role === 'recepcionista') nav('/recepcion');
      else nav('/medico');
    } catch (err) {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div style={{maxWidth:400, margin:'50px auto'}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div><input placeholder="usuario" value={username} onChange={e=>setUsername(e.target.value)} /></div>
        <div><input placeholder="contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button type="submit">Entrar</button>
      </form>
      <div style={{marginTop:10}}>
        <strong>Usuarios seed</strong>
        <ul>
          <li>admin / admin123 (admin)</li>
          <li>recep / recep123 (recepcionista)</li>
          <li>drperez / med123 (medico)</li>
        </ul>
      </div>
    </div>
  );
}
