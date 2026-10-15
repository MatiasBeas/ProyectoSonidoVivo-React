import { createContext, useContext, useEffect, useState } from "react";
import productosBase from "../data/productos";

// Mismas claves que tu proyecto original
const CLAVE_NUEVOS = "sonidoVivoProductosNuevos";
const CLAVE_EDITADOS = "sonidoVivoProductosEditados";
const CLAVE_ELIMINADOS = "sonidoVivoProductosEliminados";

function leerJSON(clave, porDefecto) {
    try {
        const valor = localStorage.getItem(clave);
        return valor ? JSON.parse(valor) : porDefecto;
    } catch {
        return porDefecto;
    }
}

const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
    const [nuevos, setNuevos] = useState(() => leerJSON(CLAVE_NUEVOS, []));        // productos agregados por el admin
    const [ediciones, setEdiciones] = useState(() => leerJSON(CLAVE_EDITADOS, {})); // { id: { campos cambiados } }
    const [eliminados, setEliminados] = useState(() => leerJSON(CLAVE_ELIMINADOS, [])); // ids eliminados

    // Cada pieza se guarda sola cuando cambia
    useEffect(() => {
        localStorage.setItem(CLAVE_NUEVOS, JSON.stringify(nuevos));
    }, [nuevos]);

    useEffect(() => {
        localStorage.setItem(CLAVE_EDITADOS, JSON.stringify(ediciones));
    }, [ediciones]);

    useEffect(() => {
        localStorage.setItem(CLAVE_ELIMINADOS, JSON.stringify(eliminados));
    }, [eliminados]);

    // El catálogo real: originales (con ediciones, sin eliminados) + nuevos (sin eliminados)
    const catalogo = [
        ...productosBase
            .filter(p => !eliminados.includes(p.id))
            .map(p => (ediciones[p.id] ? { ...p, ...ediciones[p.id] } : p)),
        ...nuevos.filter(p => !eliminados.includes(p.id)),
    ];

    function agregarProducto(datos) {
        // El id sale del máximo entre TODOS los productos (incluso eliminados),
        // así nunca se reutiliza un id
        const todosLosIds = [...productosBase, ...nuevos].map(p => p.id);
        const nuevoId = todosLosIds.length > 0 ? Math.max(...todosLosIds) + 1 : 1;

        const producto = { id: nuevoId, ...datos };
        setNuevos(actual => [...actual, producto]);

        return producto; // el admin necesita el id para fijar su stock
    }

    function editarProducto(id, cambios) {
        const esBase = productosBase.some(p => p.id === id);

        if (esBase) {
            // Un producto original no se modifica: se guarda aparte lo que cambió
            setEdiciones(actual => ({
                ...actual,
                [id]: { ...(actual[id] || {}), ...cambios },
            }));
        } else {
            setNuevos(actual => actual.map(p => (p.id === id ? { ...p, ...cambios } : p)));
        }
    }

    function eliminarProducto(id) {
        // No se borra de verdad: se marca como eliminado
        setEliminados(actual => (actual.includes(id) ? actual : [...actual, id]));
    }

    const value = { catalogo, agregarProducto, editarProducto, eliminarProducto };

    return <ProductosContext.Provider value={value}>{children}</ProductosContext.Provider>;
}

export function useProductos() {
    return useContext(ProductosContext);
}