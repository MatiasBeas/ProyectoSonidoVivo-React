import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Contacto() {
    return (
        <>
            <Navbar />
            <section>
                <div className="page-header">
                    <div className="container">
                        <h1 class="h3">Contacto</h1>
                        <p>Estamos para ayudarte con tus dudas sobre instrumentos y equipos de sonido.</p>
                    </div>
                </div>
                <div className="container pb-5">
                    <div className="row g-4">
                        <div class="col-12 mt-4 seccion-card">
                            <h5 class="mb-3">Encuéntranos</h5>
                            <iframe
                                title="Ubicación de la empresa"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.80468482298!2d-71.55084552427788!3d-33.00892447356767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689ddc274293141%3A0x9641abdaace2877d!2sMall%20Marina!5e0!3m2!1sen!2scl!4v1788398336579!5m2!1sen!2scl"
                                width="100%"
                                height="400"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div class="col-lg-5">
                            <h5 class="mb-3">Sonido Vivo</h5>
                            <p class="text-muted">
                                Tienda especializada en instrumentos musicales, equipos de sonido y accesorios para músicos.
                            </p>

                            <ul class="list-unstyled">
                                <li class="mb-2">📍 Viña del Mar, Región de Valparaíso</li>
                                <li class="mb-2">✉️ SonidoVivo@gmail.com</li>
                                <li class="mb-2">📱 WhatsApp: +56 9 1234 5678</li>
                                <li class="mb-2">📷 Instagram: @sonidovivo</li>
                            </ul>
                        </div>
                        <div class="col-lg-7">
                            <form id="formContacto">
                                <div class="mb-3">
                                    <label for="nombreContacto" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" id="nombreContacto" required/>
                                </div>

                                <div class="mb-3">
                                    <label for="emailContacto" class="form-label">Correo electrónico</label>
                                    <input type="email" class="form-control" id="emailContacto" required/>
                                </div>

                                <div class="mb-3">
                                    <label for="mensajeContacto" class="form-label">Mensaje</label>
                                    <textarea class="form-control" id="mensajeContacto" rows="4" required></textarea>
                                </div>

                                <div id="contactoError" class="alert alert-danger py-2 small d-none" role="alert"></div>
                                <div id="contactoExito" class="alert alert-success py-2 small d-none" role="alert"></div>

                                <button type="submit" class="btn btn-accent">Enviar mensaje</button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
            <Footer />

        </>
    );
}

export default Contacto;
