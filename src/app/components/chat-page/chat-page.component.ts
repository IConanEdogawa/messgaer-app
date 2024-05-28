import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent {
  messages: { user: string, message: string }[] = [];
  user: string = '';
  message: string = '';

  constructor(private signalrService: ChatService) {}

  ngOnInit(): void {
      this.signalrService.messageReceived$.subscribe(message => {
          this.messages.push(message);
          alert(message.user + ': ' + message.message);
      });
  }

  sendMessage(): void {
      if (this.user && this.message) {
          this.signalrService.sendMessage(this.user, this.message);
          this.message = '';
      }
  }
}
