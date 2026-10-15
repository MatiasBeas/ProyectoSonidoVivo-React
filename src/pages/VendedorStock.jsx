import { useState } from 'react';
import { useProductos } from '../context/ProductosContext';
import { useStock } from '../context/StockContext';

function VendedorStock() {
    const { obtenerStock, fijarStock } = useStock();
    const { catalogo } = useProductos();

    // Lo que el vendedor va escribiendo en cada fila, por id de producto.
    // Si no ha tocado una fila, el input muestra el stock actual.
    const [nuevos, setNuevos] = useState({});
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    const valorInput = (id) => (nuevos[id] !== undefined ? nuevos[id] : obtenerStock(id));

    const handleGuardar = (producto) => {
        const texto = nuevos[producto.id];

        // No escribió nada en esa fila
        if (texto === undefined) {
            setMensaje({ tipo: 'secondary', texto: `No hay cambios en "${producto.nombre}".` });
            return;
        }

        const numero = Number(texto);

        if (texto === '' || !Number.isInteger(numero) || numero < 0) {
            setMensaje({ tipo: 'danger', texto: 'Ingresa un stock válido (número entero, 0 o más).' });
            return;
        }

        fijarStock(producto.id, numero);

        // Borramos el borrador de esa fila: el input vuelve a mostrar el stock guardado
        setNuevos(actual => {
            const copia = { ...actual };
            delete copia[producto.id];
            return copia;
        });

        setMensaje({ tipo: 'success', texto: `Stock de "${producto.nombre}" actualizado a ${numero}.` });
    };

    // Color según el nivel de stock (mismos umbrales que tu stock.js)
    const claseStock = (stock) => {
        if (stock === 0) return 'text-danger fw-bold';
        if (stock <= 5) return 'text-warning fw-bold';
        return 'text-success';
    };

    return (
        <main>
            <div className="page-header">
                <div className="container">
                    <h1 className="h3">Panel de Vendedor</h1>
                    <p>Gestiona el stock de los productos del catálogo.</p>
                </div>
            </div>

            <div className="container pb-5">
                <div className="seccion-card">
                    <h5 className="mb-3">Actualizar stock de productos</h5>

                    {mensaje.texto && (
                        <div className={`alert alert-${mensaje.tipo} py-2 small`} role="alert">
                            {mensaje.texto}
                        </div>
                    )}

                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Marca</th>
                                    <th>Precio</th>
                                    <th>Stock actual</th>
                                    <th>Nuevo stock</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {catalogo.map(producto => {
                                    const stockActual = obtenerStock(producto.id);

                                    return (
                                        <tr key={producto.id}>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.marca}</td>
                                            <td>${producto.precio.toLocaleString('es-CL')}</td>
                                            <td className={claseStock(stockActual)}>{stockActual}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className="form-control form-control-sm"
                                                    style={{ width: '90px' }}
                                                    value={valorInput(producto.id)}
                                                    onChange={(e) =>
                                                        setNuevos({ ...nuevos, [producto.id]: e.target.value })
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-accent"
                                                    onClick={() => handleGuardar(producto)}
                                                >
                                                    Guardar
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default VendedorStock;