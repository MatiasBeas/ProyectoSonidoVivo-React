import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { PedidosProvider, usePedidos } from './PedidosContext';

const wrapper = ({ children }) => <PedidosProvider>{children}</PedidosProvider>;

// Datos mínimos de un pedido, como los arma el checkout
function datosPedido(email, total = 10000) {
    return {
        clienteEmail: email,
        productos: [{ id: 1, nombre: 'Mouse', precio: total, cantidad: 1 }],
        total,
        estado: 'pendiente de pago',
    };
}

describe('pedidos', () => {
    it('crea un pedido con id y fecha, y lo guarda', () => {
        // 1 Preparar
        const { result } = renderHook(() => usePedidos(), { wrapper });

        // 2 Actuar
        let pedido;
        act(() => {
            pedido = result.current.crearPedido(datosPedido('ana@correo.com'));
        });

        // 3 Comprobar
        expect(pedido.id).toBeDefined();
        expect(pedido.fecha).toBeDefined();
        expect(result.current.pedidos).toHaveLength(1);
        expect(JSON.parse(localStorage.getItem('sonidoVivoPedidos'))).toHaveLength(1);
    });

    it('pedidosDe devuelve solo los pedidos de ese correo', () => {
        const { result } = renderHook(() => usePedidos(), { wrapper });
        act(() => {
            result.current.crearPedido(datosPedido('ana@correo.com'));
            result.current.crearPedido(datosPedido('luis@correo.com'));
        });

        const deAna = result.current.pedidosDe('ANA@correo.com'); // sin importar mayúsculas

        expect(deAna).toHaveLength(1);
        expect(deAna[0].clienteEmail).toBe('ana@correo.com');
    });

    it('pedidosDe muestra primero el pedido más reciente', () => {
        const { result } = renderHook(() => usePedidos(), { wrapper });
        act(() => {
            result.current.crearPedido(datosPedido('ana@correo.com', 1000));
            result.current.crearPedido(datosPedido('ana@correo.com', 2000));
        });

        const lista = result.current.pedidosDe('ana@correo.com');

        expect(lista[0].total).toBe(2000);
        expect(lista[1].total).toBe(1000);
    });

    it('cambiarEstado actualiza el estado del pedido', () => {
        const { result } = renderHook(() => usePedidos(), { wrapper });
        let pedido;
        act(() => {
            pedido = result.current.crearPedido(datosPedido('ana@correo.com'));
        });

        act(() => {
            result.current.cambiarEstado(pedido.id, 'entregado');
        });

        expect(result.current.pedidos[0].estado).toBe('entregado');
    });
});