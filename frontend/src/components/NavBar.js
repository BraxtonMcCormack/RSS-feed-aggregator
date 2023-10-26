// src/components/NavBar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FeedContext } from '../contexts/FeedContext';

const NavBar = () => {
  const { state } = useContext(FeedContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      {state.user ? (
        <span>Welcome, {state.user.username}</span>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
