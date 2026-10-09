import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext, AuthProvider } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';

import RutaProtegida from './components/RutaProtegida'

import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import Registro from './pages/Registro'; 
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function AppContent() {
  const { sesion } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Carrito />} />

        <Route path="/registro" element={sesion ? <Navigate to="/" /> : <Registro />} />
        <Route path="/login" element={sesion ? <Navigate to="/" /> : <Login />} />
        <Route 
          path="/perfil"
          element ={
            <RutaProtegida rol="cliente" permitirAdminSiempre ={false}>
              <Perfil/>
            </RutaProtegida>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <AppContent />
      </CarritoProvider>
    </AuthProvider>
  );
}