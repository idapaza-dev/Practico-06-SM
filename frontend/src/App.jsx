import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext, Suspense, lazy } from 'react';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './context/AuthContext';
import "./index.css";

const Login = lazy(() => import('./pages/Login'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const ReceptionPanel = lazy(() => import('./pages/ReceptionPanel'));
const DoctorPanel = lazy(() => import('./pages/DoctorPanel'));
const Patients = lazy(() => import('./pages/Patients'));
const Appointments = lazy(() => import('./pages/Appointments'));

export default function App(){
  const { user } = useContext(AuthContext);
  return (
    <div className="">
      <NavBar />
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route  path="/" element={ user ? <Navigate class="bg-amber-500" to={ user.role === 'admin' ? '/admin' : user.role === 'recepcionista' ? '/recepcion' : '/medico' } /> : <Navigate to="/login" /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminPanel/></ProtectedRoute>} />
          <Route path="/recepcion" element={<ProtectedRoute roles={['recepcionista']}><ReceptionPanel/></ProtectedRoute>} />
          <Route path="/medico" element={<ProtectedRoute roles={['medico']}><DoctorPanel/></ProtectedRoute>} />
          <Route path="/patients" element={<ProtectedRoute><Patients/></ProtectedRoute>} />
          <Route path="/appointments" element={<ProtectedRoute><Appointments/></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </div>
  );
}
