import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection } from '@nestjs/websockets';
import { Logger } from '@nestjs/common'
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: '/chatUser' })
export class MessageUserGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    private logger: Logger = new Logger('MessageUserGateway');
    @WebSocketServer() wss: Server;

    afterInit(server: Server) {
        this.logger.log('Init MessageUserGateway');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    sentToAll(msg: string) {
        this.wss.emit('alertToUser', { type: 'Alert', message: msg });
    }

    // @SubscribeMessage('message')
    // handleMessage(client: any, payload: any): string {
    //   return 'Hello world!';
    // }
}
