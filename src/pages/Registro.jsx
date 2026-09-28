import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom'; // 1. Importamos el componente de enrutado

function Registro() {
    return (
        <>
            <Navbar />
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
                        {/* 2. Reemplazamos <a> por <Link> apuntando a tu ruta */}
                        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                    </p>

                </div>
            </section>
            <Footer />
        </>
    );
}

export default Registro;
