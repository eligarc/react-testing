import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getAuth } from '../../services/getAuth'
import { SessionProvider } from '../../context/AuthContext';
import { Login } from './Login';

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    }
})
// Mock de modulo
vi.mock('../../services/getAuth.ts', () => ({
    getAuth: vi.fn()
}))

const mockGetAuth = getAuth as Mock;
const mockNavigate = vi.fn();

describe('<Login />', () => {
    let usernameInput: HTMLInputElement;
    let parsswordInput: HTMLInputElement;
    let buttonLogin: HTMLButtonElement;

    beforeEach(() => {
        render(<SessionProvider><MemoryRouter><Login /></MemoryRouter></SessionProvider>)
        usernameInput = screen.getByPlaceholderText('Username');
        parsswordInput = screen.getByPlaceholderText('Password');
        buttonLogin = screen.getByRole('button', { name: 'Login'});
    })

    mockGetAuth.mockRejectedValue(new Error('Invalid credentials'));

    it('debería mostrar un mensaje de error', async () => {


        await act(() => {
            fireEvent.change(usernameInput, {target: { value: 'wrongUser'}});
            fireEvent.change(parsswordInput, {target: { value: 'wrongPassword'}});

            fireEvent.click(buttonLogin);
        })

        const errorMessage = screen.getByText('Invalid credentials');

        expect(errorMessage).toBeInTheDocument();
    })

    it('debería redirigir a /orders', async () => {
        mockGetAuth.mockResolvedValue({ succes: true });

        await act(() => {
            fireEvent.change(usernameInput, { target: { value: 'validUser' } });
            fireEvent.change(parsswordInput, { target: { value: 'validPassword' } });

            fireEvent.click(buttonLogin);
        })

        await waitFor(() => {
            expect(mockGetAuth).toHaveBeenCalledWith('validUser', 'validPassword');
            expect(mockNavigate).toHaveBeenCalledWith('/orders');
        })
    })
})