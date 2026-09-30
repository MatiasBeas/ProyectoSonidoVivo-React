import { Link } from 'react-router-dom'; 

function Registro() {
    return (
        <>
            <section className="auth-bg">
                <div className="auth-card">

                    <div className="brand">Sonido Vivo</div>

                    <form id="formRegistro">
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre completo</label>
                            <input type="text" className="form-control" id="nombre" required/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input type="email" className="form-control" id="email" required/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="password" required/>
                            <div className="form-text">Mínimo 6 caracteres, con mayúscula, minúscula y número.</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
                            <input type="password" className="form-control" id="confirmPassword" required/>
                        </div>

                        <div id="registroError" className="alert alert-danger py-2 small d-none" role="alert"></div>

                        <button type="submit" className="btn btn-accent">Crear cuenta</button>
                    </form>

                    <p className="text-center mt-3 auth-switch">
                        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                    </p>

                </div>
            </section>
        </>
    );
}

export default Registro;
