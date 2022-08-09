import { NavLink, useLocation } from "react-router-dom"
import React, { useEffect } from "react"
import CartButton from "../Cart/CartButton"
import styles from "./navbar.module.css"



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
      <nav className={`${styles.header}`}>
        <div className={`${styles.logo}`}>
          <h1>BOOK EXCHANGE</h1>
        </div>
        <div className={`${styles.links}`}>
          <NavLink to="/">
            Home
          </NavLink>
          <NavLink to="/books">
            Books
          </NavLink>
          <NavLink id={styles.createlink} to="/books/create">
            Create Book
          </NavLink>
          { isLoggedIn && <NavLink id={styles.profilelink} to="/profile">
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
        </div>

        <div className={`${styles.cart_button}`}>
          <CartButton onClick={props.onShowCart} />
        </div>

      </nav>
    </>
  )
}