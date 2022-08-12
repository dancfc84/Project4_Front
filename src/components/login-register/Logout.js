/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import styles from './Logout.module.css'

export default function Logout() {
  const delayInMilliseconds = 1000; //1 second
  const navigate = useNavigate()

  useEffect(()=> {
    setTimeout(function() {
      navigate('/books')
    }, delayInMilliseconds);

  }, [])


  return (
    <>
      <div className={styles.text_container}>
        <p className={styles.logout_text}>You have been successfully logged out, redirecting...</p>
      </div>
    </>
  )
}