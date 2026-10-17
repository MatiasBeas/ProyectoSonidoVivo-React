import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import RutaProtegida from './RutaProtegida';

// Monta una ruta protegida en /privado.
// "sesion" es la sesión guardada (o null si es invitado).
function renderizarRuta(rolExigido, sesion, permitirAdminSiempre = true) {
    if (sesion) {
        localStorage.setItem('sonidoVivoSesion', JSON.stringify(sesion));
    }

    render(
        <MemoryRouter initialEntries={['/privado']}>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<p>Pantalla de inicio</p>} />
                    <Route path="/login" element={<p>Pantalla de login</p>} />
                    <Route
                        path="/privado"
                        element={
                            <RutaProtegida
                                rol={rolExigido}
                                permitirAdminSiempre={permitirAdminSiempre}
                            >
                                <p>Contenido privado</p>
                            </RutaProtegida>
                        }
                    />
                </Routes>
            </AuthProvider>
        </MemoryRouter>,
    );
}

const cliente = { email: 'ana@correo.com', nombre: 'Ana', rol: 'cliente' };
const admin = { email: 'jefe@admin.com', nombre: 'Jefe', rol: 'administrador' };

describe('RutaProtegida', () => {
    it('manda al login a quien no tiene sesión', () => {
        renderizarRuta('cliente', null);

        expect(screen.getByText('Pantalla de login')).toBeInTheDocument();
        expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument();
    });

    it('manda al inicio a quien tiene un rol distinto', () => {
        renderizarRuta('administrador', cliente);

        expect(screen.getByText('Pantalla de inicio')).toBeInTheDocument();
        expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument();
    });

    it('deja pasar a quien tiene el rol exigido', () => {
        renderizarRuta('cliente', cliente);

        expect(screen.getByText('Contenido privado')).toBeInTheDocument();
    });

    it('deja pasar al administrador a una ruta de otro rol', () => {
        renderizarRuta('cliente', admin);

        expect(screen.getByText('Contenido privado')).toBeInTheDocument();
    });

    it('bloquea al administrador si la ruta no lo permite', () => {
        renderizarRuta('cliente', admin, false);

        expect(screen.getByText('Pantalla de inicio')).toBeInTheDocument();
        expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument();
    });

    it('si no se exige ningún rol, deja pasar a cualquiera con sesión', () => {
        renderizarRuta(undefined, cliente);

        expect(screen.getByText('Contenido privado')).toBeInTheDocument();
    });
});