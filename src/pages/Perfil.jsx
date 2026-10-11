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

export default Perfil;