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
