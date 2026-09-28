import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Carrito() {
    return (
        <>
            <Navbar />
            <section className="py-5">
                <div className="container">
                    <h1 className="h3 mb-4">Tu carrito</h1>
                    <div id="carritoVacio" className="text-center text-muted py-5 d-none">
                        <p className="mb-3">Aún no has agregado productos a tu carrito.</p>
                        <a href="/productos" className="btn btn-accent">Ver catálogo</a>
                    </div>
                    <div id="listaCarrito"></div>
                    <div id="resumenCarrito" className="d-none border-top pt-4 mt-4 d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">Total: <span id="totalCarrito">$0</span></h4>
                        <button className="btn btn-accent" id="btnConfirmarPedido">Confirmar pedido</button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );

}

export default Carrito;