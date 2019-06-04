import React, { Component } from "react";

export class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  handleChange = event => {
    this.setState({ content: event.target.value });
  };

  handleKeyDown = event => {
    if (event.key === "Enter") {
      this.props.addMessage(this.state.content);
      event.target.value = "";
      this.setState({ content: "" });
    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.props.currentUser.name}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
        />
      </footer>
    );
  }
}
