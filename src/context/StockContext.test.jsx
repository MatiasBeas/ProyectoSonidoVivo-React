import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ProductosProvider, useProductos } from './ProductosContext';
import { StockProvider, useStock } from './StockContext';

// Une los dos hooks para usarlos juntos en cada prueba
function usarTienda() {
    return { ...useProductos(), ...useStock() };
}

// StockProvider necesita estar dentro de ProductosProvider, igual que en App.jsx
const wrapper = ({ children }) => (
    <ProductosProvider>
        <StockProvider>{children}</StockProvider>
    </ProductosProvider>
);

describe('descontarStock', () => {
    it('descuenta lo comprado del stock', () => {
        // 1 Preparar: un producto con stock 2
        const { result } = renderHook(usarTienda, { wrapper });
        const id = result.current.catalogo[0].id;

        act(() => {
            result.current.fijarStock(id, 2);
        });
        expect(result.current.obtenerStock(id)).toBe(2);

        // 2 Actuar: comprar 2 unidades
        act(() => {
            result.current.descontarStock([{ id, cantidad: 2 }]);
        });

        // 3 Comprobar: no queda stock
        expect(result.current.obtenerStock(id)).toBe(0);
    });

    it('nunca deja el stock en negativo', () => {
        // 1 Preparar: stock 1
        const { result } = renderHook(usarTienda, { wrapper });
        const id = result.current.catalogo[0].id;

        act(() => {
            result.current.fijarStock(id, 1);
        });

        // 2 Actuar: intentar comprar 5
        act(() => {
            result.current.descontarStock([{ id, cantidad: 5 }]);
        });

        // 3 Comprobar: se queda en 0, no en -4
        expect(result.current.obtenerStock(id)).toBe(0);
    });
});