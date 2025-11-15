import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import "../index.css";

export default function Login() {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-200 to-amber-900">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm">
        
        <h2 className="text-3xl font-bold text-center text-amber-700 mb-6">
          Login
        </h2>

        <form onSubmit={submit} className="space-y-4">

          <input 
            className="w-full p-3 rounded-lg border border-amber-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            placeholder="Usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <input 
            type="password"
            className="w-full p-3 rounded-lg border border-amber-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button 
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Entrar
          </button>

        </form>

        <div className="mt-6 text-sm text-gray-700">
          <strong className="text-amber-700">Usuarios seed:</strong>
          <ul className="mt-2 space-y-1">
            <li className="bg-amber-100 px-2 py-1 rounded">admin / admin123 (admin)</li>
            <li className="bg-amber-100 px-2 py-1 rounded">recep / recep123 (recepcionista)</li>
            <li className="bg-amber-100 px-2 py-1 rounded">drperez / med123 (medico)</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
