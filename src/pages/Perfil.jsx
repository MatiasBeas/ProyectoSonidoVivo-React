<<<<<<< HEAD
import { Link } from 'react-router-dom';

function Perfil(){
    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1 className="h3">Mi perfil</h1>
                    <p>Administra tus datos personales.</p>
                </div>
            </section>

            <section className="container pb-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="seccion-card">
                            <form id="formPerfil">
                                <div className="mb-3">
                                    <label for="perfilNombre" className="form-label">Nombre completo</label>
                                    <input type="text" className="from-control" id="perfilNombre" required></input>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Correo electrónico</label>
                                    <input type="email" className="form-control" id="perfilEmail" desabled/>
                                    <div className="form-text">El correo no se puede modificar.</div>
                                </div>

                                <hr/>
                                
                                <p className="small text-muted mb-2">Deja los campos de contraseña en blanco si no deseas 
                                    cambiarla.</p>
                                
                                <div className="mb-3">
                                    <label for="perfilPasswordNueva" className="form-label">Nueva contraseña</label>
                                    <input type="password" className="form-control" id="perfilPasswordNueva"></input>
                                </div>

                                <div className="mb-3">
                                    <label for="perfilPasswordConfirmar" className="form-label">Confirmar nueva contraseña</label>
                                    <input type="password" className="form-control" id="perfilPasswordConfirmar"></input>
                                </div>

                                <div id="perfilError" className="alert alert-danger py-2 small d-none" role="alert"></div>
                                <div id="perfilExito" className="alert alert-success py-2 small d-none" role="alert"></div>

                                <button type="submit" className="btn btn-accent">Guardar cambios</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

=======
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Perfil() {
    const { sesion, actualizarPerfil, logout } = useAuth();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState(sesion?.nombre || '');
    const [passwordNueva, setPasswordNueva] = useState('');
    const [passwordConfirmar, setPasswordConfirmar] = useState('');
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    const handleGuardarCambios = (e) => {
        e.preventDefault();
        setMensaje({ tipo: '', texto: '' });

        const resultado = actualizarPerfil({ nombre, passwordNueva, passwordConfirmar });

        if (!resultado.ok) {
            setMensaje({ tipo: 'danger', texto: resultado.error });
            return;
        }

        setPasswordNueva('');
        setPasswordConfirmar('');
        setMensaje({ tipo: 'success', texto: 'Perfil actualizado correctamente.' });
    };

    const handleCerrarSesion = () => {
        logout();
        navigate('/login');
    };

    if (!sesion) return null;

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm p-4">
                        <h2 className="mb-4 text-center">Perfil de Usuario</h2>

                        {mensaje.texto && (
                            <div className={`alert alert-${mensaje.tipo} py-2 small`} role="alert">
                                {mensaje.texto}
                            </div>
                        )}

                        <form onSubmit={handleGuardarCambios}>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={sesion.email}
                                    disabled
                                />
                                <div className="form-text">El correo no se puede modificar.</div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-muted mb-0">Rol Actual</label>
                                <div>
                                    <span className="badge bg-primary fs-6">{sesion.rol}</span>
                                </div>
                            </div>

                            <hr />

                            <p className="small text-muted mb-2">
                                Deja los campos de contraseña en blanco si no deseas cambiarla.
                            </p>

                            <div className="mb-3">
                                <label htmlFor="passwordNueva" className="form-label">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="passwordNueva"
                                    placeholder="••••••••"
                                    value={passwordNueva}
                                    onChange={(e) => setPasswordNueva(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="passwordConfirmar" className="form-label">Confirmar Nueva Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="passwordConfirmar"
                                    placeholder="••••••••"
                                    value={passwordConfirmar}
                                    onChange={(e) => setPasswordConfirmar(e.target.value)}
                                />
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <button type="submit" className="btn btn-accent">Guardar Cambios</button>
                                <button
                                    type="button"
                                    onClick={handleCerrarSesion}
                                    className="btn btn-outline-danger"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

>>>>>>> recuperacion
export default Perfil;