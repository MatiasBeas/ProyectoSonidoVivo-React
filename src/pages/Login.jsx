import { Link } from 'react-router-dom';

function Login() {
    return (
        <>
            <section className="auth-bg">
                <div className="auth-card">
                    <div className="brand">Sonido Vivo</div>
                    <form id="formLogin">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input type="email" className="form-control" id="email" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="password" required />
                        </div>

                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="recordarme" />
                            <label className="form-check-label" htmlFor="recordarme">Recordarme</label>
                        </div>

                        <button type="submit" className="btn btn-accent">Iniciar sesión</button>
                    </form>

                    <p className="text-center mt-3 auth-switch">
                        ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
                    </p>
                </div>
            </section>
        </>
    );
}

export default Login;