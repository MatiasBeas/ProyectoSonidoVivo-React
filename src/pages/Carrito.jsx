import { Link } from 'react-router-dom';
import productos from '../data/productos';
import { useCarrito } from '../context/CarritoContext';

function Carrito() {
    const { carrito, cambiarCantidad, eliminarDelCarrito } = useCarrito();
    const lineas = carrito.map(item => ({...item,producto: productos.find(p => p.id === item.id),}))
        .filter(linea => linea.producto);
    const total = lineas.reduce(
        (suma, linea) => suma + linea.producto.precio * linea.cantidad,
        0
    );

    return (
        <section className="py-5">
            <div className="container">
                <h1 className="h3 mb-4">Tu carrito</h1>

                {lineas.length === 0 ? (
                    <div className="text-center text-muted py-5">
                        <p className="mb-3">Aún no has agregado productos a tu carrito.</p>
                        <Link to="/productos" className="btn btn-accent">Ver catálogo</Link>
                    </div>
                ) : (
                    <>
                        {lineas.map(({ producto, cantidad }) => (
                            <div key={producto.id} className="d-flex align-items-center border-bottom py-3 gap-3">
                                <img src={producto.imagen}alt={producto.nombre}style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}/>

                                <div className="flex-grow-1">
                                    <h6 className="mb-1">{producto.nombre}</h6>
                                    <p className="text-muted mb-0 small">
                                        ${producto.precio.toLocaleString('es-CL')} c/u
                                    </p>
                                </div>

                                <input type="number"min="1"className="form-control"style={{ width: '70px' }}value={cantidad}onChange={e => cambiarCantidad(producto.id, e.target.value)}/>
                                <p className="fw-bold mb-0" style={{ minWidth: '90px' }}>
                                    ${(producto.precio * cantidad).toLocaleString('es-CL')}
                                </p>

                                <button className="btn btn-outline-danger btn-sm"onClick={() => eliminarDelCarrito(producto.id)}>
                                    Eliminar
                                </button>
                            </div>
                        ))}

                        <div className="border-top pt-4 mt-4 d-flex justify-content-between align-items-center">
                            <h4 className="mb-0">Total: ${total.toLocaleString('es-CL')}</h4>
                            <button className="btn btn-accent">Confirmar pedido</button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default Carrito;