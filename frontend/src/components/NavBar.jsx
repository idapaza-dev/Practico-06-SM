import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-amber-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      
      {/* Izquierda: enlaces de navegación */}
      <div className="flex items-center space-x-6 font-semibold">
        <Link className="hover:text-amber-200 transition" to="/">Inicio</Link>

        {user && user.role === 'admin' && (
          <Link className="hover:text-amber-200 transition" to="/admin">Admin</Link>
        )}

        {user && user.role === 'recepcionista' && (
          <Link className="hover:text-amber-200 transition" to="/recepcion">Recepción</Link>
        )}

        {user && user.role === 'medico' && (
          <Link className="hover:text-amber-200 transition" to="/medico">Médico</Link>
        )}

        <Link className="hover:text-amber-200 transition" to="/patients">Pacientes</Link>
        <Link className="hover:text-amber-200 transition" to="/appointments">Turnos</Link>
      </div>

      {/* Derecha: usuario + botón salir */}
      <div className="flex items-center space-x-4">
        
        {user && (
          <span className="text-sm bg-white/20 px-3 py-1 rounded-lg">
            {user.name} ({user.role})
          </span>
        )}

        <button
          className="bg-white text-amber-700 font-semibold px-3 py-1 rounded hover:bg-amber-100 transition"
          onClick={logout}
        >
          Salir
        </button>

      </div>
    </nav>
  );
}
