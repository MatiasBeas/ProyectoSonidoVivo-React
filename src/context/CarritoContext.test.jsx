import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CarritoProvider, useCarrito } from './CarritoContext';

const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>;

describe('carrito de compras', () => {
    it('agrega un producto nuevo con cantidad 1', () => {
        // 1 Preparar
        const { result } = renderHook(() => useCarrito(), { wrapper });

        // 2 Actuar
        act(() => {
            result.current.agregarAlCarrito(1);
        });

        // 3 Comprobar
        expect(result.current.carrito).toEqual([{ id: 1, cantidad: 1 }]);
    });

    it('suma una unidad si el producto ya estaba en el carrito', () => {
        const { result } = renderHook(() => useCarrito(), { wrapper });

        act(() => {
            result.current.agregarAlCarrito(1);
            result.current.agregarAlCarrito(1);
        });

        expect(result.current.carrito).toEqual([{ id: 1, cantidad: 2 }]);
        expect(result.current.totalItems).toBe(2);
    });

    it('cambia la cantidad y nunca deja menos de 1', () => {
        const { result } = renderHook(() => useCarrito(), { wrapper });
        act(() => {
            result.current.agregarAlCarrito(1);
        });

        act(() => {
            result.current.cambiarCantidad(1, 5);
        });
        expect(result.current.carrito[0].cantidad).toBe(5);

        act(() => {
            result.current.cambiarCantidad(1, 0);
        });
        expect(result.current.carrito[0].cantidad).toBe(1);
    });

    it('elimina un producto sin tocar los demás', () => {
        const { result } = renderHook(() => useCarrito(), { wrapper });
        act(() => {
            result.current.agregarAlCarrito(1);
            result.current.agregarAlCarrito(2);
        });

        act(() => {
            result.current.eliminarDelCarrito(1);
        });

        expect(result.current.carrito).toEqual([{ id: 2, cantidad: 1 }]);
    });

    it('vacía el carrito', () => {
        const { result } = renderHook(() => useCarrito(), { wrapper });
        act(() => {
            result.current.agregarAlCarrito(1);
            result.current.agregarAlCarrito(2);
        });

        act(() => {
            result.current.vaciarCarrito();
        });

        expect(result.current.carrito).toEqual([]);
        expect(result.current.totalItems).toBe(0);
    });

    it('guarda el carrito en localStorage', () => {
        const { result } = renderHook(() => useCarrito(), { wrapper });

        act(() => {
            result.current.agregarAlCarrito(3);
        });

        expect(JSON.parse(localStorage.getItem('sonidoVivoCarrito'))).toEqual([
            { id: 3, cantidad: 1 },
        ]);
    });
});