import { NavLink, useLocation } from "react-router-dom"
import React, { useEffect } from "react"
import CartButton from "../Cart/CartButton"



export default function Navbar(props) {

  //This notes down everytime there is a change in the url, very handy for when you want to re-render a component, when change is not in same compnent
  const location = useLocation()

  const [isLoggedIn, setIsLoggedIn] = React.useState(Boolean(localStorage.getItem("loggedIn")))

  // eslint-disable-next-line no-unused-vars

  //this is updated everytime the route is changed
  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("loggedIn")))
  }, [location])

  function navbarLogout() {
    window.localStorage.clear()
    setIsLoggedIn(false)
  }


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
            <NavLink to="/books/create">
              Create Book
            </NavLink>
            { isLoggedIn && <NavLink to="/profile">
              Profile
            </NavLink>}
            <NavLink to="/contact">
              Contact
            </NavLink>

            { isLoggedIn && <NavLink onClick={navbarLogout} to="/logout">
              Logout
            </NavLink>} 
            { !isLoggedIn && <NavLink to="/login">
              Login
            </NavLink> }

            <CartButton onClick={props.onShowCart} />

          </div>
        </nav>
      </header>
    </>
  )
}