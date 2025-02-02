import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PitchService } from './pitch/pitch.service';

@WebSocketGateway({ cors: true })
export class SearchGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private clients = new Set<Socket>();
    constructor(private readonly pitchService: PitchService) { }

    handleConnection(client: Socket) {
        console.log('Client connected:', client.id);
        this.clients.add(client);
    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
        this.clients.delete(client);
    }

    @SubscribeMessage('search')
    handleSearch(
        @MessageBody() data: { latitude: string, longitude: string, radius: string, type: string }, @ConnectedSocket() client: Socket,
    ): void {

        // Mock search results
        // const results = this.searchData(query);
        this.pitchService.pitchWithinRadius({
            type: 'Point',
            coordinates: [parseFloat(data.latitude), parseFloat(data.longitude)],
        }, parseFloat(data.radius), parseInt(data.type))
            .then(results => {
                console.log(results.length + ' results found');
                client.emit('searchResults', results);
            })
            .catch(error => {
                console.error(error);
                client.emit('searchResults', []);
            });

    }

}
