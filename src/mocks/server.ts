import { setupServer } from 'msw/node';
import { handles } from './handlers';

export const server = setupServer(...handles);


