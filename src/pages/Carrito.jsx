import { Link } from 'react-router-dom';

function Carrito() {
    return (
        <>
            <section className="py-5">
                <div className="container">
                    <h1 className="h3 mb-4">Tu carrito</h1>
                    <div className="text-center text-muted py-5 ">
                        <p className="mb-3">Aún no has agregado productos a tu carrito.</p>
                        <Link to="/productos" className="btn btn-accent">Ver catálogo</Link>
                    </div>
                </div>
            </section>
        </>
    );

}

export default Carrito;