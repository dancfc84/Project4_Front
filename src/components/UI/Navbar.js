import { NavLink } from "react-router-dom"
import React from "react"
import CartButton from "../Cart/CartButton"


export default function Navbar(props) {

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
            <CartButton onClick={props.onShowCart} />

          </div>
        </nav>
      </header>
    </>
  )
}