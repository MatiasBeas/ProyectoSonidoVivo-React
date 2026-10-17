import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App.jsx';

describe('Navegación', () => {
    it('navega a Productos y marca el enlace como activo', async () => {
        // 1 Preparar: abrir la app en el inicio
        const user = userEvent.setup();
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>,
        );

        // 2 Actuar: clic en el enlace "Productos" del navbar
        await user.click(
            screen.getByRole('link', { name: 'Productos', exact: true }),
        );

        // 3 Comprobar: aparece el título de la página y el enlace queda activo
        expect(
            await screen.findByRole('heading', { name: 'Nuestro catálogo' }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole('link', { name: 'Productos', exact: true }),
        ).toHaveAttribute('aria-current', 'page');
    });
});