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
    constructor(private readonly pitchService: PitchService) {}

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
        @MessageBody() radiusData: { latitude: string, longitude: string, radius: string },        @ConnectedSocket() client: Socket,
    ): void {
        console.log(`point from client received: `+radiusData.latitude+' '+ radiusData.longitude );

        // Mock search results
        // const results = this.searchData(query);
        this.pitchService.pitchWithinRadius({
            type: 'Point',
            coordinates: [parseFloat(radiusData.latitude), parseFloat(radiusData.longitude)],
        }, parseFloat(radiusData.radius))
            .then(results => {
                console.log(results);
                client.emit('searchResults', results);
            })
            .catch(error => {
                console.error(error);
                client.emit('searchResults', []);
            });

    }

    private searchData(query: string): string[] {
        // Replace with your search logic
        const mockData = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
        return mockData.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase()),
        );
    }
}
