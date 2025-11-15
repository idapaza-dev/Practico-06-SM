import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function NavBar(){
  const { user, logout } = useContext(AuthContext);
  return (
    <nav style={{padding:10,borderBottom:'1px solid #ddd'}}>
      <Link to="/">Inicio</Link> {' | '}
      {user && user.role === 'admin' && <Link to="/admin">Admin</Link>}
      {user && user.role === 'recepcionista' && <Link to="/recepcion">Recepción</Link>}
      {user && user.role === 'medico' && <Link to="/medico">Médico</Link>}
      {' | '} <Link to="/patients">Pacientes</Link>
      {' | '} <Link to="/appointments">Turnos</Link>
      <span style={{float:'right'}}>{user ? `${user.name} (${user.role}) • ` : ''}<button onClick={logout}>Salir</button></span>
    </nav>
  );
}
