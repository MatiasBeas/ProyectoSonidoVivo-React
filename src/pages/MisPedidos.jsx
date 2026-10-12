import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePedidos } from '../context/PedidosContext';

// Color del estado (equivale a las clases que usaba tu misPedidos.js)
const CLASE_ESTADO = {
    'pendiente de pago': 'text-danger',
    'en preparación': 'text-warning',
    'listo para retiro/despacho': 'text-primary',
    'entregado': 'text-success',
};

function MisPedidos() {
    const { sesion } = useAuth();
    const { pedidosDe } = usePedidos();

    // Solo los pedidos de quien tiene la sesión, los más recientes primero
    const misPedidos = pedidosDe(sesion.email);

    return (
        <main>
            <div className="page-header">
                <div className="container">
                    <h1 className="h3">Mis pedidos</h1>
                    <p>Revisa el estado de tus compras.</p>
                </div>
            </div>

            <div className="container pb-5">
                {misPedidos.length === 0 ? (
                    <div className="text-center text-muted py-5">
                        <p className="mb-3">Aún no has realizado ningún pedido.</p>
                        <Link to="/productos" className="btn btn-accent">Ver catálogo</Link>
                    </div>
                ) : (
                    <div className="d-flex flex-column gap-3">
                        {misPedidos.map(pedido => (
                            <div key={pedido.id} className="seccion-card">
                                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                                    <div>
                                        <h6 className="mb-1">Pedido #{pedido.id}</h6>
                                        <p className="small text-muted mb-2">
                                            {new Date(pedido.fecha).toLocaleDateString('es-CL')}
                                        </p>
                                        <p className="small mb-1">
                                            {pedido.productos.map(p => `${p.nombre} x${p.cantidad}`).join(', ')}
                                        </p>
                                        <p className="small mb-0">
                                            Entrega: {pedido.entrega} · Pago: {pedido.metodoPago}
                                        </p>
                                        {pedido.direccion && (
                                            <p className="small text-muted mb-0">Dirección: {pedido.direccion}</p>
                                        )}
                                    </div>
                                    <div className="text-end">
                                        <p className="fw-bold mb-1">${pedido.total.toLocaleString('es-CL')}</p>
                                        <span className={`small fw-bold ${CLASE_ESTADO[pedido.estado] || 'text-muted'}`}>
                                            {pedido.estado}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default MisPedidos;