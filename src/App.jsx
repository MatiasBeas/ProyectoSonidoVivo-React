<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import Registro from './pages/Registro'; 
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [usuario, setUsuario] = useState(null);
  return (
    
    <BrowserRouter>
      <Navbar usuario={usuario} />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />}/>
        <Route path="/registro" element={<Registro/>}/>
        <Route path="/carrito" element={<Carrito/>}/>
        <Route path="/login" element={<Login setUsuario={setUsuario} />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    
  );
}
export default App;
=======
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext, AuthProvider } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';
import { PedidosProvider } from './context/PedidosContext';

import RutaProtegida from './components/RutaProtegida'

import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import Registro from './pages/Registro';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Checkout from './pages/Checkout';
import MisPedidos from './pages/MisPedidos';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

function RedirigirSiLogueado({ children }) {
  const { sesion } = useContext(AuthContext);
  const location = useLocation();

  if (sesion) {
    return <Navigate to={location.state?.from || '/'} replace />;
  }
  return children;
}

function AppContent() {
  const { sesion } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Carrito />} />

        <Route path="/registro" element={<RedirigirSiLogueado><Registro /></RedirigirSiLogueado>} />
        <Route path="/login" element={<RedirigirSiLogueado><Login /></RedirigirSiLogueado>} />
        <Route
          path="/perfil"
          element={
            <RutaProtegida>
              <Perfil />
            </RutaProtegida>
          }
        />
        <Route
          path="/checkout"
          element={
            <RutaProtegida>
              <Checkout />
            </RutaProtegida>
          }
        />
        <Route
          path="/pedidos"
          element={
            <RutaProtegida rol="cliente" permitirAdminSiempre={false}>
              <MisPedidos />
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
        <PedidosProvider>
          <AppContent />
        </PedidosProvider>
      </CarritoProvider>
    </AuthProvider>
  );
}
>>>>>>> recuperacion
