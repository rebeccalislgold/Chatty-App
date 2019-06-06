import React, { Component } from "react";
import { Message } from "./Message.jsx";
import { Notification } from "./Notification.jsx";

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(messageObj =>
      messageObj.type === "incomingMessage" ? (
        <Message
          key={messageObj.id}
          username={messageObj.username}
          content={messageObj.content}
        />
      ) : (
        <Notification
          key={messageObj.id}
          //   username={messageObj.username}
          content={messageObj.content}
        />
      )
    );

    return (
      // if ({messageObj.type} === 'incomingMessage') {
      <main className="messages">
        <div>{messages}</div>
      </main>
    );
  }
}

export default MessageList;
