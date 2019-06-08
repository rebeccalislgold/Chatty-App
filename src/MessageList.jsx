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
          color={messageObj.color}
        />
      ) : (
        <Notification key={messageObj.id} content={messageObj.content} />
      )
    );

    return (
      <main className="messages">
        <div>{messages}</div>
      </main>
    );
  }
}

export default MessageList;
