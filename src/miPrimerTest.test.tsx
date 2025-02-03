import {describe, it, expect} from 'vitest';

describe('Mi primer test',  () => {
    it('La suma de dos numeros', () => {
        const suma = (a: number, b: number) => a + b;

        const resultado = suma(2, 3);

        expect(resultado).toBe(5);
    })

    it('dos textos iguales', () => {
        const text1 = 'Elio'
        const text2 = 'Elio'

        expect(text1).toBe(text2);
    })
})