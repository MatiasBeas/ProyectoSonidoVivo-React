import { createContext, useContext, useEffect, useState } from "react";

const CLAVE_CARRITO = "sonidoVivoCarrito";

function leerCarrito() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
    } catch {
        return [];
    }
}

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {

    const [carrito, setCarrito] = useState(leerCarrito);

    useEffect(() => {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));}, [carrito]);

    function agregarAlCarrito(id) {
        setCarrito(actual => {
            const existe = actual.find(item => item.id === id);

            if (existe) {
                return actual.map(item =>
                    item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...actual, { id, cantidad: 1 }];
        });
    }

    function cambiarCantidad(id, cantidad) {
        const numero = Number(cantidad);

        const valida = isNaN(numero) || numero < 1 ? 1 : numero;

        setCarrito(actual =>
            actual.map(item => (item.id === id ? { ...item, cantidad: valida } : item))
        );
    }

    function eliminarDelCarrito(id) {
        setCarrito(actual => actual.filter(item => item.id !== id));
    }

    const totalItems = carrito.reduce((suma, item) => suma + item.cantidad, 0);

    const value = {
        carrito,
        totalItems,
        agregarAlCarrito,
        cambiarCantidad,
        eliminarDelCarrito,
    };
    return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
    return useContext(CarritoContext);
}