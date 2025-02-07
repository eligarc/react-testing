import {describe, it, expect, vi, beforeEach, Mock} from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import { SessionProvider, useSession } from '../context/AuthContext';
import { getOrders } from '../services/getOrders';
import { useOrders } from './useOrders';
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

vi.mock('')


vi.mock('../context/AuthContext', async () => {
    const actual = await vi.importActual('../context/AuthContext');

    return {
        ...actual,
        useSession: vi.fn(),
    }
})

describe('useOrders', () => {
    const mockUser = {id: 1, name: 'Elio'};

    beforeEach(() => {
        (useSession as Mock).mockReturnValue({ user: mockUser });
    })

    const wrapper = ({ children }: {children: React.ReactNode}) => (
        <SessionProvider>
            <MemoryRouter>
                {children}
            </MemoryRouter>
        </SessionProvider>
    )

    it('Debe obtener good la data', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useOrders(), { wrapper });

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();

        const lengthOrders = result.current.orders.length;

        expect(lengthOrders).toBe(1);
    })
})
