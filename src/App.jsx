import React, { Component } from "react";
import MessageList from "./MessageList.jsx";
import { ChatBar } from "./ChatBar.jsx";

class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:

    // add 'message' and 'current user' to state -- how?
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: "1j3l12k",
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          id: "934kfa9",
          username: "Anonymous",
          content:
            "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  addMessage = newMessage => {
    const messageObject = {
      id: this.state.messages.length + 1,
      username: this.state.currentUser.name,
      content: newMessage
    };

    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, messageObject];
    this.setState({ messages: newMessages });
  };

  componentDidMount() {
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
        />
      </div>
    );
  }
}
export default App;
