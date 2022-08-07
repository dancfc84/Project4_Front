import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

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
      <div>
        <p>You have been successfully logged out, redirecting...</p>
      </div>
    </>
  )
}