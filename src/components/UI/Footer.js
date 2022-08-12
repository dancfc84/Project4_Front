// eslint-disable-next-line no-unused-vars
import styles from './Footer.module.css'
import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function Footer () {

  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("loggedIn")))
  const location = useLocation()

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("loggedIn")))
  }, [location])


  return <>
    <footer className={`footer ${styles.footer_class}`}>
      <div className={styles.copyright_text}>
        <p>Copyright © Book Exchange</p>
  
      </div>
      <div className={`columns ${styles.footer_text_class}`}>

        <div className="column">
          <h4>
            Book Exchange
          </h4>
          <p >
            Book Exchange is a website for 
            people who love reading but want to lessen their 
            environmental impact that their beloved hobby has on the planet
          </p>
        </div>
        <div className="column">
          <h4 >
            Explore Site
          </h4>
          <p>
            { isLoggedIn && <a href="/profile">
              <p>Profile</p>
            </a>}
            <a href="/books">
              <p>All Books</p>
            </a>
            { isLoggedIn && <a href="/books/create">
              <p>Create Book </p>
            </a>}
            { isLoggedIn && <a href="/authors/create">
              <p>Create Author </p>
            </a>}
          </p>
          
      
        </div>

        <div className="column">
          <h4 >
            Contact us
          </h4>
    
          <p>
            <a href="/contact">
              <p>Email</p>
            </a>
          </p>
        </div>
      </div>
    </footer>
  </>
}