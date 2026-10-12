import productos from '../data/productos';
import { useCarrito } from '../context/CarritoContext';

function Productos() {
    const {agregarAlCarrito} = useCarrito();
    return (
        <>
            <section className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold">Nuestros Productos</h2>
                    <div className="row g-4">
                        {productos.map((producto, index) => (
                            <div className="col-md-4" key={producto.id}>
                                <div className="card h-100 shadow-sm">
                                    <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
                                    <div className="card-body d-flex flex-column">
                                        <span className="badge bg-secondary align-self-start mb-2">{producto.categoria}</span>
                                        <h5 className="card-title">{producto.nombre}</h5>
                                        <p className="text-muted mb-1">{producto.marca} — {producto.modelo}</p>
                                        <p className="card-text flex-grow-1">{producto.descripcion}</p>
                                        <p className="fw-bold fs-5 mb-1">${producto.precio.toLocaleString("es-CL")}</p>
                                        <p className="small text-success mb-3">Stock: {producto.stock}</p>
                                        <button className="btn btn-accent mt-auto" onClick={() => agregarAlCarrito(producto.id)}>Agregar al carrito</button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Productos;