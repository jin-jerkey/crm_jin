import { Injectable } from '@angular/core';
declare var SockJS: new (arg0: any) => any;
declare var Stomp: { over: (arg0: any) => any; };

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {
    this.initializeWebSocketConnection();
  }
  public stompClient!: { connect: (arg0: {}, arg1: (frame: any) => void) => void; subscribe: (arg0: string, arg1: (message: any) => void) => void; send: (arg0: string, arg1: {}, arg2: any) => void; };
  public msg:any = [];
  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8082/socket';
    console.log(serverUrl);
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function (frame: any) {
      that.stompClient.subscribe('/message', (message: { body: any }) => {
        if (message.body) {
          const messageData = JSON.parse(message.body);
          const senderName = messageData.senderName;
          const messageContent = messageData.message;
  
          that.msg.push(`${senderName}: ${messageContent}`);
        }
      });
    });
  }

  sendMessage(messagePayload: any) {
    this.stompClient.send('/app/send/message', {}, JSON.stringify(messagePayload));
  }
  
}