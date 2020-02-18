import { OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class AppGateway implements OnGatewayInit {
    private logger;
    afterInit(server: Server): void;
    handleMessage(client: any, payload: any): string;
}
