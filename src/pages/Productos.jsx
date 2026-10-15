import { useState } from 'react';

import { useProductos } from '../context/ProductosContext';
import { useCarrito } from '../context/CarritoContext';
import { useStock } from '../context/StockContext';



function Productos() {
    const { catalogo } = useProductos();
    const { carrito, agregarAlCarrito } = useCarrito();
    const { obtenerStock } = useStock();

    // Se recalculan con el catálogo actual (si el admin agrega una categoría nueva, aparece sola)
    const categorias = [...new Set(catalogo.map(p => p.categoria))];

    const [busqueda, setBusqueda] = useState('');
    const [categoria, setCategoria] = useState('todos');

    // Lista filtrada: se recalcula en cada render a partir de los dos filtros
    const texto = busqueda.trim().toLowerCase();

    const productosFiltrados = catalogo.filter(p => {
        const coincideCategoria = categoria === 'todos' || p.categoria === categoria;
        const coincideTexto =
            texto === '' ||
            p.nombre.toLowerCase().includes(texto) ||
            p.marca.toLowerCase().includes(texto);

        return coincideCategoria && coincideTexto;
    });

    return (
        <main className="container py-5">
            <div className="toolbar-productos d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                    <h1 className="h3 mb-0">Nuestro catálogo</h1>
                    <p className="text-muted small mb-0">Instrumentos, equipos de sonido y accesorios</p>
                </div>

                <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar producto o marca..."
                        style={{ minWidth: '220px' }}
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />

                    <select
                        className="form-select"
                        style={{ minWidth: '220px' }}
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="todos">Todas las categorías</option>
                        {categorias.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <span className="small text-muted text-nowrap">
                        {productosFiltrados.length} productos
                    </span>
                </div>
            </div>

            {productosFiltrados.length === 0 ? (
                <div className="text-center text-muted py-5">
                    <p className="mb-0">No se encontraron productos con esos filtros.</p>
                </div>
            ) : (
                <div className="row g-4">
                    {productosFiltrados.map((producto) => {
                        const stock = obtenerStock(producto.id);
                        const enCarrito = carrito.find(item => item.id === producto.id)?.cantidad || 0;

                        const agotado = stock === 0;
                        const llegoAlMaximo = enCarrito >= stock;

                        let claseStock = 'text-success';
                        let textoStock = `Stock: ${stock}`;
                        if (agotado) {
                            claseStock = 'text-danger';
                            textoStock = 'Agotado';
                        } else if (stock <= 3) {
                            claseStock = 'text-warning';
                            textoStock = `¡Quedan solo ${stock}!`;
                        }

                        let textoBoton = 'Agregar al carrito';
                        if (agotado) textoBoton = 'Agotado';
                        else if (llegoAlMaximo) textoBoton = 'Máximo en tu carrito';

                        return (
                            <div className="col-md-4" key={producto.id}>
                                <div className="card h-100 shadow-sm">
                                    <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
                                    <div className="card-body d-flex flex-column">
                                        <span className="badge bg-secondary align-self-start mb-2">{producto.categoria}</span>
                                        <h5 className="card-title">{producto.nombre}</h5>
                                        <p className="text-muted mb-1">{producto.marca} — {producto.modelo}</p>
                                        <p className="card-text flex-grow-1">{producto.descripcion}</p>
                                        <p className="fw-bold fs-5 mb-1">${producto.precio.toLocaleString('es-CL')}</p>
                                        <p className={`small mb-3 ${claseStock}`}>{textoStock}</p>
                                        <button
                                            className="btn btn-accent mt-auto"
                                            disabled={agotado || llegoAlMaximo}
                                            onClick={() => agregarAlCarrito(producto.id)}
                                        >
                                            {textoBoton}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </main>
    );
}

export default Productos;