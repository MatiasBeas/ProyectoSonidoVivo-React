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
                                    <input type="email" className="form-control" id="perfilEmail" desabled>
                                    <div className="form-text">El correo no se puede modificar.</div>
                                </div>

                                <hr>
                                
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

export default Perfil;