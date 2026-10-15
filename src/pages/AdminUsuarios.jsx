import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ROLES_POSIBLES = ['cliente', 'vendedor', 'administrador'];

function AdminUsuarios() {
    const { sesion, obtenerUsuarios, cambiarRol, alternarActivo } = useAuth();

    // La lista se lee de localStorage al abrir la página y se vuelve a leer tras cada cambio
    const [usuarios, setUsuarios] = useState(obtenerUsuarios);

    const handleCambiarRol = (email, nuevoRol) => {
        cambiarRol(email, nuevoRol);
        setUsuarios(obtenerUsuarios());
    };

    const handleAlternarActivo = (email) => {
        alternarActivo(email);
        setUsuarios(obtenerUsuarios());
    };

    return (
        <main>
            <div className="page-header">
                <div className="container">
                    <h1 className="h3">Panel de Administrador</h1>
                    <p>Gestiona los usuarios registrados en el sistema.</p>
                </div>
            </div>

            <div className="container pb-5">
                <div className="seccion-card">
                    <h5 className="mb-3">Usuarios registrados</h5>

                    {usuarios.length === 0 ? (
                        <p className="text-muted mb-0">Aún no hay usuarios registrados.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Rol</th>
                                        <th>Estado</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map(usuario => {
                                        const estaActivo = usuario.activo !== false; // por defecto, activo
                                        const esUnoMismo =
                                            usuario.email.toLowerCase() === sesion.email.toLowerCase();

                                        return (
                                            <tr key={usuario.email}>
                                                <td>
                                                    {usuario.nombre}
                                                    {esUnoMismo && <span className="text-muted small"> (tú)</span>}
                                                </td>
                                                <td>{usuario.email}</td>
                                                <td>
                                                    <select
                                                        className="form-select form-select-sm"
                                                        style={{ minWidth: '150px' }}
                                                        value={usuario.rol || 'cliente'}
                                                        disabled={esUnoMismo}
                                                        onChange={(e) => handleCambiarRol(usuario.email, e.target.value)}
                                                    >
                                                        {ROLES_POSIBLES.map(rol => (
                                                            <option key={rol} value={rol}>{rol}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                    <span className={`small fw-bold ${estaActivo ? 'text-success' : 'text-danger'}`}>
                                                        {estaActivo ? 'Activo' : 'Desactivado'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        disabled={esUnoMismo}
                                                        onClick={() => handleAlternarActivo(usuario.email)}
                                                    >
                                                        {estaActivo ? 'Desactivar' : 'Activar'}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default AdminUsuarios;