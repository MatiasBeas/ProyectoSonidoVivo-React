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
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-lg-auto align-items-lg-center">
                        <li className="nav-item mt-2 mt-lg-0 me-lg-3">
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


                </div>
            </div>
        </nav>
    );
}

export default Navbar;