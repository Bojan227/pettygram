import socketClient from 'socket.io-client';
export const socket: any = socketClient('http://localhost:4000/');
