import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Button } from './Button'

describe('<Button />', () => {
    it('Debería renderizar el componente', () => {
        render(<Button label='click' />);
        const button = screen.getByText('click');

        expect(button).toBeInTheDocument();
    })

    it('Debería llamar a la función onClick', async () => {
        // Arrange: Preparar componente
        const handleClick = vi.fn();
        render(<Button label='Click' onClick={handleClick}/>)
        const button = screen.getByText('Click');

        // Act: Ejecutas alguna acción del componente
        await act(() => {
            fireEvent.click(button);
        })

        // Asset: La accción se la que esperabas
        expect(handleClick).toHaveBeenCalledTimes(1);
    })
})

