import React from "react"
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom"
import 'bulma'
import classes from './WishlistBook.module.css'
import axios from "axios"
import baseUrl from "../../config"
import { getLoggedInUserId } from "../../lib/auth"

const Book = (props) => {

  console.log(props.bookInfo);

  const removeWishlistHandler = async () => {
    try {
      const { data } = await axios.delete(`${baseUrl}/books/liked/${getLoggedInUserId()}/${props.bookInfo.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      props.setRemovedFromWishlist(data)
    } catch (error) {
      console.log(error);
    }

  }

  return <> 
    <div className={`card ${classes.card}`  }>
      <div >
        <figure className={`card-image`}>
          <img  src={props.bookInfo.image} alt={props.name} />  
        </figure>
        <div className={`card-content ${classes.card_text}`}>
          <div className={`card-image`} >{props.bookInfo.name}</div>
        </div>
        <div className={classes.button_container}>
          <button onClick={removeWishlistHandler} className={classes.del_button}>Remove</button>
        </div>
      </div>
    </div>
  </>
}

export default Book

