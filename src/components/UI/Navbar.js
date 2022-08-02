import { NavLink } from "react-router-dom"
import React from "react"


export default function Navbar() {

  return (
    <>
      <header>
        <nav>
          <div>
            <NavLink to="/">
              Home
            </NavLink>
            <NavLink to="/books">
              Books
            </NavLink>
            <NavLink to="/profile">
              Profile
            </NavLink>
            <NavLink to="/login">
              Login
            </NavLink>
            <NavLink to="/contact">
              Contact
            </NavLink>
          </div>
        </nav>
      </header>
    </>
  )
}