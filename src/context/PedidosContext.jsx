import { createContext, useContext, useEffect, useState } from "react";

const CLAVE_PEDIDOS = "sonidoVivoPedidos";

export const ESTADOS_POSIBLES = [
    "pendiente de pago",
    "en preparación",
    "listo para retiro/despacho",
    "entregado",
];

function leerPedidos() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_PEDIDOS)) || [];
    } catch {
        return [];
    }
}

const PedidosContext = createContext(null);

export function PedidosProvider({ children }) {
    const [pedidos, setPedidos] = useState(leerPedidos);

    useEffect(() => {
        localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(pedidos));
    }, [pedidos]);

    function crearPedido(datosPedido) {
        const nuevoPedido = {
            id: Date.now(),
            fecha: new Date().toISOString(),
            ...datosPedido,
        };
        setPedidos(actual => [...actual, nuevoPedido]);
        return nuevoPedido;
    }

    function cambiarEstado(id, nuevoEstado) {
        setPedidos(actual =>
            actual.map(p => (p.id === id ? { ...p, estado: nuevoEstado } : p))
        );
    }

    function pedidosDe(email) {
        return pedidos
            .filter(p => p.clienteEmail.toLowerCase() === email.toLowerCase())
            .reverse();
    }

    const value = { pedidos, crearPedido, cambiarEstado, pedidosDe };

    return <PedidosContext.Provider value={value}>{children}</PedidosContext.Provider>;
}

export function usePedidos() {
    return useContext(PedidosContext);
}