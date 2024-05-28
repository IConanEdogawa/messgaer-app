import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubConnection: signalR.HubConnection;
    private messageReceived = new Subject<{user: string, message: string}>();

    messageReceived$ = this.messageReceived.asObservable();

    constructor() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7283/chathub')
            .build();

        this.hubConnection.on('ReceiveMessage', (user, message) => {
            this.messageReceived.next({ user, message });
        });

        this.hubConnection.start().catch(err => console.error(err));
    }

    sendMessage(user: string, message: string) {
        this.hubConnection.invoke('SendMessage', user, message).catch(err => console.error(err));
    }
}
