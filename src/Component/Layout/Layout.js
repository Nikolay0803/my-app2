import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Layout = () => {
   const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      <header
        style={{
          display: "flex",
          gap: 30,
          fontSize: 20,
          padding: 40,
        }}
      >
        <NavLink to="/">Home</NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to="/todo">App Todo</NavLink>
            <NavLink to="/about">About</NavLink>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      {/* <footer>All rights ...2023 </footer> */}
    </>
  );
}

export default Layout