import React, { Component } from "react";
import { Message } from "./Message.jsx";

class Notification extends Component {
  render() {
    return (
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
    );
  }
}

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(messageObj => (
      <Message
        key={messageObj.id}
        username={messageObj.username}
        content={messageObj.content}
      />
    ));
    return (
      <main className="messages">
        <div>{messages}</div>
        <Notification />
      </main>
    );
  }
}

export default MessageList;
