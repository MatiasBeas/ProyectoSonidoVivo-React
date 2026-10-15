import { createContext, useContext, useEffect, useState } from "react";
import { useProductos } from "./ProductosContext";

const CLAVE_STOCK = "sonidoVivoStock";

function leerCambios() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_STOCK)) || {};
    } catch {
        return {};
    }
}

const StockContext = createContext(null);

export function StockProvider({ children }) {
    const { catalogo } = useProductos();

    // Guarda solo los CAMBIOS, por ejemplo { "1": 6, "4": 0 }.
    // Lo que no aparezca aquí usa el stock del catálogo.
    const [cambios, setCambios] = useState(leerCambios);

    useEffect(() => {
        localStorage.setItem(CLAVE_STOCK, JSON.stringify(cambios));
    }, [cambios]);

    // Stock "de fábrica": el que dice el catálogo
    function stockBase(id) {
        const producto = catalogo.find(p => p.id === id);
        return producto ? producto.stock : 0;
    }

    function obtenerStock(id) {
        return cambios[id] !== undefined ? cambios[id] : stockBase(id);
    }

    function descontarStock(lineas) {
        setCambios(actual => {
            const nuevo = { ...actual };

            lineas.forEach(({ id, cantidad }) => {
                const actualProducto = actual[id] !== undefined ? actual[id] : stockBase(id);
                nuevo[id] = Math.max(0, actualProducto - cantidad);
            });

            return nuevo;
        });
    }

    function fijarStock(id, cantidad) {
        const valor = Math.max(0, Number(cantidad) || 0);
        setCambios(actual => ({ ...actual, [id]: valor }));
    }

    const value = { obtenerStock, descontarStock, fijarStock };

    return <StockContext.Provider value={value}>{children}</StockContext.Provider>;
}

export function useStock() {
    return useContext(StockContext);
}