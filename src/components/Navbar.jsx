<<<<<<< HEAD
import { Link } from 'react-router-dom';


function Navbar({ usuario }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Sonido Vivo</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/productos">Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contacto">Contacto</Link>
=======
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext';

function Navbar() {
    const { sesion, logout } = useAuth();
    const { totalItems } = useCarrito();
    const navigate = useNavigate();
    const [menuAbierto, setMenuAbierto] = useState(false);          
    const [dropdownAbierto, setDropdownAbierto] = useState(false);  
    const cerrarMenus = () => {
        setMenuAbierto(false);
        setDropdownAbierto(false);
    };
    const handleLogout = () => {
        logout();
        cerrarMenus();
        navigate('/');
    };

    const claseNavLink = ({ isActive }) => 'nav-link' + (isActive ? ' active' : '');
    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" onClick={cerrarMenus}>Sonido Vivo</Link>
                <button className="navbar-toggler"type="button"aria-label="Toggle navigation"aria-expanded={menuAbierto}onClick={() => setMenuAbierto(!menuAbierto)}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={'collapse navbar-collapse' + (menuAbierto ? ' show' : '')}>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className={claseNavLink} to="/" end onClick={cerrarMenus}>Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={claseNavLink} to="/productos" onClick={cerrarMenus}>Productos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={claseNavLink} to="/contacto" onClick={cerrarMenus}>Contacto</NavLink>
>>>>>>> recuperacion
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-lg-auto align-items-lg-center">
                        <li className="nav-item mt-2 mt-lg-0 me-lg-3">
<<<<<<< HEAD
                            <Link className="nav-link text-white position-relative" to="/carrito" id="iconoCarrito">
                                🛒
                                <span id="contadorCarrito" className="badge rounded-pill d-none" style={{ position: 'absolute', top: 0, right: '-8px', backgroundColor: 'var(--acento)', fontSize: '0.65rem' }}>
                                    0
                                </span>

                            </Link>
                        </li>
                        <li className="nav-item mt-2 mt-lg-0" id="navInvitado">
                            <Link to="/login" className="btn btn-outline-light btn-sm rounded-pill px-3 me-lg-2">Iniciar
                                sesión</Link>
                            <Link to="/registro" className="btn btn-accent btn-sm rounded-pill px-3">Registrarse</Link>
                        </li>
                        
                        <li className="nav-item dropdown mt-2 mt-lg-0 d-none" id="navUsuario">
                            <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown">
                                <span id="navUsuarioEmail"></span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" href="pedidos.html">Mis pedidos</a></li>
                                <li><a className="dropdown-item" href="perfil.html">Mi perfil</a></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><a className="dropdown-item" href="#" id="btnCerrarSesion">Cerrar sesión</a></li>
                            </ul>
                        </li>
                    </ul>


=======
                            <Link className="nav-link text-white position-relative" to="/carrito" onClick={cerrarMenus}>
                                🛒
                                {totalItems > 0 && (
                                    <span className="badge rounded-pill"style={{ position: 'absolute', top: 0, right: '-8px', backgroundColor: 'var(--acento)', fontSize: '0.65rem' }}
                                    >
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        </li>
                        {sesion ? (
                            <li className="nav-item dropdown mt-2 mt-lg-0">
                                <a className="nav-link dropdown-toggle text-white"href="#"role="button"aria-expanded={dropdownAbierto}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setDropdownAbierto(!dropdownAbierto);
                                    }}
                                >
                                    {sesion.email}
                                </a>
                                <ul className={'dropdown-menu dropdown-menu-end' + (dropdownAbierto ? ' show' : '')}>
                                    <li><Link className="dropdown-item" to="/pedidos" onClick={cerrarMenus}>Mis pedidos</Link></li>
                                    <li><Link className="dropdown-item" to="/perfil" onClick={cerrarMenus}>Mi perfil</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button className="dropdown-item" type="button" onClick={handleLogout}>
                                            Cerrar sesión
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item mt-2 mt-lg-0">
                                <Link to="/login" className="btn btn-outline-light btn-sm rounded-pill px-3 me-lg-2" onClick={cerrarMenus}>
                                    Iniciar sesión
                                </Link>
                                <Link to="/registro" className="btn btn-accent btn-sm rounded-pill px-3" onClick={cerrarMenus}>
                                    Registrarse
                                </Link>
                            </li>
                        )}
                    </ul>
>>>>>>> recuperacion
                </div>
            </div>
        </nav>
    );
}

<<<<<<< HEAD
=======


>>>>>>> recuperacion
export default Navbar;