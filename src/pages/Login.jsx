import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Pasamos 'email' y 'password' por separado como lo requiere AuthContext.jsx
        const res = login(email, password);

        if (!res.ok) {
            setError(res.error);
        } else {
            // Si el login es correcto, redirigimos a la página principal
            navigate('/'); 
        }
    };
    
    return (
        <section className="auth-bg">
            <div className="auth-card">
                <div className="brand">Sonido Vivo</div>
                
                {/* 1. Evento onSubmit agregado */}
                <form id="formLogin" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo electrónico</label>
                        {/* 2. Conectados value y onChange */}
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
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        {/* 2. Conectados value y onChange */}
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="recordarme" />
                        <label className="form-check-label" htmlFor="recordarme">Recordarme</label>
                    </div>

                    {/* Mensaje de error si credenciales son incorrectas */}
                    {error && (
                        <div className="alert alert-danger py-2 small mb-3" role="alert">
                            {error}
                        </div>
                    )}

                    <button type="submit" className="btn btn-accent">Iniciar sesión</button>
                </form>

                <p className="text-center mt-3 auth-switch">
                    ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
                </p>
            </div>
        </section>
    );
}

export default Login;