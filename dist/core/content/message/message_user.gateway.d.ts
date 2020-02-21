import { OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class MessageUserGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger;
    wss: Server;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
    sentToAll(msg: string): void;
}
