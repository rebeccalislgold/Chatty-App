import React, { Component } from "react";

export class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  handleKeyDown = event => {
    if (event.key === "Enter") {
      this.props.addMessage(this.state.content);
      event.target.value = "";
      this.setState({ content: "" });
    }
  };

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleKeyDownUser = event => {
    if (event.key === "Enter") {
      this.props.changeUser(event.target.value);
    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          name="username"
          placeholder="Your Name (Optional)"
          onKeyDown={this.handleKeyDownUser}
        />
        <input
          className="chatbar-message"
          name="content"
          placeholder="Type a message and hit ENTER"
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
        />
      </footer>
    );
  }
}
