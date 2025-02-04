import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Calculator } from './Calculator'

describe('<Calulator />', () => {
    const useCasesTest = [
        {a: 1, b: 2, operation: 'add', expected: 3},
        { a : 5, b : 3, operation : 'subtract', expected : 2 },
        { a : 2, b : 3, operation : 'multiply', expected : 6 },
        { a : 6, b : 3, operation : 'divide', expected : 2 },
        { a : 6, b : 0, operation : 'divide', expected : 'Error' },
    ]

    it.each(useCasesTest)('Debería retornar $expected cuando $a y $b son $operation', ({ a, b, operation, expected }) => {
        render(<Calculator a={a} b={b} operation={operation} />);
        const result = screen.getByText(`Result: ${expected}`);
        expect(result).toBeInTheDocument();
    })
})