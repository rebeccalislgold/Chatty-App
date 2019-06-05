import React, { Component } from "react";
import MessageList from "./MessageList.jsx";
import { ChatBar } from "./ChatBar.jsx";
import uuidv1 from "uuid/v1";

class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:

    this.socket = new WebSocket("ws://localhost:3001");

    // add 'message' and 'current user' to state -- how?
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }

  addMessage = newMessage => {
    const messageObject = {
      // id: uuidv1(),
      username: this.state.currentUser.name,
      content: newMessage,
      type: "outgoingMessage"
    };

    this.socket.send(JSON.stringify(messageObject));
    // const oldMessages = this.state.messages;
    // const newMessages = [...oldMessages, messageObject];
    // this.setState({ messages: newMessages });
  };

  // changeUser = newUser => {
  //   this.setState({ currentUser: { name: newUser } });
  // };

  changeUser = newUser => {
    const newCurrentUser = { name: newUser };
    // const local_CurrentUser = Object.assign({}, this.state.currentUser);
    // local_CurrentUser.name = newUser;
    this.setState({ currentUser: newCurrentUser });
  };

  componentDidMount() {
    //opening the connection
    this.socket.onopen = () => {
      console.log("Connected to server"); //
    };

    this.socket.onmessage = event => {
      let data = JSON.parse(event.data);
      this.setState({ messages: [...this.state.messages, data] });

      // this.socket.send(this.state.messages);
      console.log("blaaah", event.data);
    };

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          addMessage={this.addMessage}
          changeUser={this.changeUser}
        />
      </div>
    );
  }
}
export default App;
