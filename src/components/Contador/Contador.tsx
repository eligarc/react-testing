import { useState } from 'react';
import { Button } from '../Button';

export const Contador = () => {
    const [contador, setContador] = useState(0);

    const handleIncrementar = () => {
        setContador(contador + 1);
    }

    return (<div>
        <p>Contador: {contador}</p>
        <Button label='Incrementar' onClick={handleIncrementar} />
    </div>)
}