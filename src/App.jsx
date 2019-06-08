import React, { Component } from "react";
import MessageList from "./MessageList.jsx";
import { ChatBar } from "./ChatBar.jsx";
import { NavBar } from "./navBar.jsx";
import uuidv1 from "uuid/v1";

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws://localhost:3001");
    this.state = {
      currentUser: { name: "Anonymous", userColor: "black" },
      messages: [],
      activeUsers: 0
    };
  }

  // Method to pass down to ChatBat child component to add message to app messages
  addMessage = newMessage => {
    const messageObject = {
      username: this.state.currentUser.name,
      color: this.state.currentUser.userColor,
      content: newMessage,
      type: "outgoingMessage"
    };

    this.socket.send(JSON.stringify(messageObject));
  };

  // Method to pass down to ChatBat child component to change currentUser name
  changeUser = newUser => {
    const userColor = this.state.currentUser.userColor;
    const userObject = {
      username: newUser,
      content: `${
        this.state.currentUser.name
      } changed their name to ${newUser}.`,
      type: "outgoingNotification"
    };

    this.socket.send(JSON.stringify(userObject));

    this.setState({
      currentUser: { name: newUser, userColor: userColor }
    });
  };

  // Invoke immediately after component is mounted
  componentDidMount() {
    //opening the connection
    this.socket.onopen = () => {
      console.log("Connected to server");
    };

    // When data is received from back-end, update app state based on data type
    this.socket.onmessage = event => {
      let data = JSON.parse(event.data);
      if (data.type === "numberOfUsers") {
        this.setState({ activeUsers: data.users });
      } else if (data.type === "clientInfo") {
        this.setState({
          currentUser: { name: data.username, userColor: data.color }
        });
      } else {
        this.setState({ messages: [...this.state.messages, data] });
      }
    };

    // console.log("componentDidMount <App />");
  }

  // Render React components
  render() {
    return (
      <div className="container">
        <NavBar activeUsers={this.state.activeUsers} />
        <MessageList
          messages={this.state.messages}
          color={this.state.currentUser.userColor}
          notifications={this.state.notifications}
        />
        <ChatBar addMessage={this.addMessage} changeUser={this.changeUser} />
      </div>
    );
  }
}
export default App;
