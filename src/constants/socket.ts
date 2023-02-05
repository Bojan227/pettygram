import { url } from './api';
import socketClient from 'socket.io-client';
export const socket: any = socketClient(`${url}/`);
