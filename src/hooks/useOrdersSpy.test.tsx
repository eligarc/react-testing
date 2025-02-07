import { describe, it, expect, vi, MockInstance, beforeEach, Mock, afterEach } from "vitest";
import { renderHook } from "@testing-library/react-hooks"
import * as ReactRouter from 'react-router-dom';

import { useOrders } from './useOrders';
import * as AuthContext from '../context/AuthContext';
import * as GetOrders from '../services/getOrders';

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
}))

describe('useOrderSpy', () => {
    let useSessionSpy: MockInstance;
    let getOrdersSpy: MockInstance;
    const mockNavigateSpy = vi.fn();


    beforeEach(() => {
        useSessionSpy = vi.spyOn(AuthContext, 'useSession');
        getOrdersSpy = vi.spyOn(GetOrders, 'getOrders');

        (ReactRouter.useNavigate as Mock).mockReturnValue(mockNavigateSpy);
    })

    afterEach(() => {
        vi.resetAllMocks();
    })

    it('Debería mostrar un error', async () => {
        useSessionSpy.mockReturnValue({ user: { id: 1 } });
        getOrdersSpy.mockRejectedValue(new Error('Api error'));

        const { result, waitForNextUpdate } = renderHook(() => useOrders());

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();

        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe('Failed to fetch orders. Please try again later.');
        expect(getOrdersSpy).toHaveBeenCalledTimes(1);
    })
})