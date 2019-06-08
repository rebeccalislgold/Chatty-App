import React, { Component } from "react";

export class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Chatty
        </a>
        <div className="user-count">
          {this.props.activeUsers} user(s) online
        </div>
      </nav>
    );
  }
}

export default NavBar;
