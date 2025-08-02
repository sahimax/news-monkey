import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Nav extends Component {
  render() {
    return (
      <>

      <nav className="navbar">
  <div className="navbar-left">
    <Link to="/" className="logo">
     NewsMonkey
    </Link>
  </div>
  <div className="navbar-center">
    <ul className="nav-links">
      <li>
        <Link to="/apple">Apple</Link>
      </li>
      <li>
        <Link to="/">Tesla</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
    </ul>
  </div>
  <div className="navbar-right">
    <Link to="/cart" className="cart-icon">
      <i className="fas fa-shopping-cart"></i>
      <span className="cart-count">0</span>
    </Link>
    <Link to="/account" className="user-icon">
      <i className="fas fa-user"></i>
    </Link>
  </div>
</nav>

      </>
    )
  }
}
