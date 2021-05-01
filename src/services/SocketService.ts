import * as logsym from 'log-symbols';
import { Server, Socket } from 'socket.io'; 
import { SOCKET_CLIENTS } from '../constants/SocketClients';
import { SOCKET_EVENTS } from '../constants/SocketEvents';

export class SocketService {
    socket: Server;

    constructor(
        socket: Server
    ) {
        this.socket = socket;

        /**
         * Socket Service Methods 
        */
        this.onConnectionEstablished();
    }

    onConnectionEstablished() {
        this.socket.on(SOCKET_EVENTS.connection, (socket: Socket) => {
            socket.on('disconnect', () => {
                console.log(logsym.warning, `A connection has been destroyed ${socket.id}`);
            })

            if (!(<any>Object).values(SOCKET_CLIENTS).includes(socket.handshake.query.client)) {
                console.log(logsym.warning, `Unauthorized Socket Connection:`, socket.handshake.query.client, socket.id)
                socket.disconnect();
            } else {
                console.log(logsym.success, `A ${socket.handshake.query.client} connection has been established:`, socket.id)
            }
        })
    }
}