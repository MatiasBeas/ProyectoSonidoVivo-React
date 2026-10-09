import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Perfil() {
    const { sesion, logout } = useAuth();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState(sesion?.nombre || '');
    const [email, setEmail] = useState(sesion?.email || '');
    const [password, setPassword] = useState(''); 
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    const obtenerRolPorEmail = (correo) => {
        const emailLower = correo.toLowerCase();
        if (emailLower.endsWith('@admin.com')) return 'administrador';
        if (emailLower.endsWith('@vendedor.com')) return 'vendedor';
        return 'cliente';
    };

    const handleGuardarCambios = (e) => {
        e.preventDefault();
        setMensaje({ tipo: '', texto: '' });

        if (!nombre.trim() || !email.trim()) {
            setMensaje({ tipo: 'danger', texto: 'El nombre y el correo no pueden estar vacíos.' });
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem('sonidoVivoUsuario') || '[]');

        const indexActual = usuarios.findIndex(
            (u) => u.email.toLowerCase() === sesion?.email.toLowerCase()
        );

        if (indexActual === -1) {
            setMensaje({ tipo: 'danger', texto: 'No se encontró el usuario en la base de datos local.' });
            return;
        }

        const correoEnUso = usuarios.some(
            (u, idx) => idx !== indexActual && u.email.toLowerCase() === email.trim().toLowerCase()
        );

        if (correoEnUso) {
            setMensaje({ tipo: 'danger', texto: 'El correo ingresado ya está registrado por otro usuario.' });
            return;
        }

        const nuevoRol = obtenerRolPorEmail(email.trim());

        const usuarioActualizado = {
            ...usuarios[indexActual],
            nombre: nombre.trim(),
            email: email.trim(),
            rol: nuevoRol,
            password: password.trim() !== '' ? password : usuarios[indexActual].password
        };

        usuarios[indexActual] = usuarioActualizado;
        localStorage.setItem('sonidoVivoUsuario', JSON.stringify(usuarios));

        const nuevaSesion = {
            nombre: usuarioActualizado.nombre,
            email: usuarioActualizado.email,
            rol: usuarioActualizado.rol
        };
        localStorage.setItem('sonidoVivoSesion', JSON.stringify(nuevaSesion));

        setPassword('');
        setMensaje({ tipo: 'success', texto: '¡Perfil, correo y contraseña actualizados correctamente! (Recarga para ver cambios reflejados)' });
    };

    const handleCerrarSesion = () => {
        logout();
        navigate('/login');
    };

    if (!sesion) {
        return (
            <div className="container my-5 text-center">
                <h3>No hay una sesión activa</h3>
                <p>Por favor, inicia sesión para ver tu perfil.</p>
            </div>
        );
    }

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
                                <label htmlFor="nombre" className="form-label">
                                    Nombre Completo
                                </label>
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
                                <label htmlFor="email" className="form-label">
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Nueva Contraseña <small className="text-muted">(deja en blanco si no deseas cambiarla)</small>
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-muted mb-0">Rol Actual</label>
                                <div>
                                    <span className="badge bg-primary fs-6">
                                        {obtenerRolPorEmail(email)}
                                    </span>
                                </div>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <button type="submit" className="btn btn-accent">
                                    Guardar Cambios
                                </button>
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