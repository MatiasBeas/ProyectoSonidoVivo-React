import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

const datosValidos = {
    nombre: 'Ana Pérez',
    email: 'ana@correo.com',
    password: 'Hola123',
    confirmPassword: 'Hola123',
};

describe('registrar', () => {
    it('crea una cuenta válida con rol cliente', () => {
        // 1 Preparar
        const { result } = renderHook(() => useAuth(), { wrapper });

        // 2 Actuar
        let resultado;
        act(() => {
            resultado = result.current.registrar(datosValidos);
        });

        // 3 Comprobar
        expect(resultado.ok).toBe(true);

        const guardados = JSON.parse(localStorage.getItem('sonidoVivoUsuarios'));
        expect(guardados).toHaveLength(1);
        expect(guardados[0].email).toBe('ana@correo.com');
        expect(guardados[0].rol).toBe('cliente');
    });

    it('asigna el rol según el dominio del correo', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        act(() => {
            result.current.registrar({ ...datosValidos, email: 'jefe@admin.com' });
            result.current.registrar({ ...datosValidos, email: 'ventas@vendedor.com' });
        });

        const guardados = JSON.parse(localStorage.getItem('sonidoVivoUsuarios'));
        expect(guardados.find(u => u.email === 'jefe@admin.com').rol).toBe('administrador');
        expect(guardados.find(u => u.email === 'ventas@vendedor.com').rol).toBe('vendedor');
    });

    it('rechaza una contraseña débil y no guarda nada', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        let resultado;
        act(() => {
            resultado = result.current.registrar({
                ...datosValidos,
                password: 'abc',
                confirmPassword: 'abc',
            });
        });

        expect(resultado.ok).toBe(false);
        expect(localStorage.getItem('sonidoVivoUsuarios')).toBeNull();
    });

    it('rechaza si las contraseñas no coinciden', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        let resultado;
        act(() => {
            resultado = result.current.registrar({
                ...datosValidos,
                confirmPassword: 'Distinta123',
            });
        });

        expect(resultado.ok).toBe(false);
    });

    it('rechaza un correo que ya existe', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        let segundo;
        act(() => {
            result.current.registrar(datosValidos);
            segundo = result.current.registrar(datosValidos);
        });

        expect(segundo.ok).toBe(false);
        expect(JSON.parse(localStorage.getItem('sonidoVivoUsuarios'))).toHaveLength(1);
    });
});

describe('login y logout', () => {
    // Deja una cuenta ya registrada en el "almacenamiento", antes de cada prueba
    function guardarUsuario(extra = {}) {
        localStorage.setItem(
            'sonidoVivoUsuarios',
            JSON.stringify([
                {
                    nombre: 'Ana Pérez',
                    email: 'ana@correo.com',
                    password: 'Hola123',
                    rol: 'cliente',
                    ...extra,
                },
            ]),
        );
    }

    it('inicia sesión con credenciales correctas', () => {
        // 1 Preparar
        guardarUsuario();
        const { result } = renderHook(() => useAuth(), { wrapper });
        expect(result.current.sesion).toBeNull();

        // 2 Actuar
        let resultado;
        act(() => {
            resultado = result.current.login('ana@correo.com', 'Hola123');
        });

        // 3 Comprobar
        expect(resultado.ok).toBe(true);
        expect(result.current.sesion).toEqual({
            email: 'ana@correo.com',
            nombre: 'Ana Pérez',
            rol: 'cliente',
        });
        expect(localStorage.getItem('sonidoVivoSesion')).not.toBeNull();
    });

    it('rechaza una contraseña incorrecta', () => {
        guardarUsuario();
        const { result } = renderHook(() => useAuth(), { wrapper });

        let resultado;
        act(() => {
            resultado = result.current.login('ana@correo.com', 'Incorrecta1');
        });

        expect(resultado.ok).toBe(false);
        expect(result.current.sesion).toBeNull();
    });

    it('rechaza un correo que no está registrado', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        let resultado;
        act(() => {
            resultado = result.current.login('nadie@correo.com', 'Hola123');
        });

        expect(resultado.ok).toBe(false);
        expect(result.current.sesion).toBeNull();
    });

    it('no deja entrar a una cuenta desactivada', () => {
        guardarUsuario({ activo: false });
        const { result } = renderHook(() => useAuth(), { wrapper });

        let resultado;
        act(() => {
            resultado = result.current.login('ana@correo.com', 'Hola123');
        });

        expect(resultado.ok).toBe(false);
        expect(result.current.sesion).toBeNull();
    });

    it('cierra la sesión y borra lo guardado', () => {
        guardarUsuario();
        const { result } = renderHook(() => useAuth(), { wrapper });

        act(() => {
            result.current.login('ana@correo.com', 'Hola123');
        });
        expect(result.current.sesion).not.toBeNull();

        act(() => {
            result.current.logout();
        });

        expect(result.current.sesion).toBeNull();
        expect(localStorage.getItem('sonidoVivoSesion')).toBeNull();
    });

    it('recupera la sesión guardada al abrir la página', () => {
        // Simula a alguien que ya había iniciado sesión y recarga
        localStorage.setItem(
            'sonidoVivoSesion',
            JSON.stringify({ email: 'ana@correo.com', nombre: 'Ana Pérez', rol: 'cliente' }),
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        expect(result.current.sesion.email).toBe('ana@correo.com');
    });
});