import { OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class MessageGateway implements OnGatewayInit {
    private logger;
    wss: Server;
    afterInit(server: Server): void;
    sentToAll(msg: string): void;
}
