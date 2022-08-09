import React, { useContext } from "react"
import CartContext from "../../store/cart-context"
import baseUrl from "../../config";
import axios from "axios";
import { isCreator } from "../../lib/auth.js";
import { getLoggedInUserId } from "../../lib/auth.js";
import classes from "./BookListing.module.css"


export default function BookListing(props) {

  const cartCtx = useContext(CartContext)

  const listing = props.listing;

  const currUser = getLoggedInUserId();

  console.log(listing);

  //Whenever add to cart button is pressed, the cart context 
  const addToCartHandler = () => {
    currUser ?
      cartCtx.addItem({
        id: listing.id,
        name: listing.name,
        condition: listing.condition,
        type: listing.type,
        user: listing.username,
      }) : props.setLoginRegisterModal(true)
  }


  const deleteHandler = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await axios.delete(`${baseUrl}/listings/${listing.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      props.setDeletedListing(data)
    } catch (error) {
      console.log(error);
    }
  }
  
  console.log(currUser);

  return (
    <>
      <div key={listing.id}>
        <div className={`${classes.listing_container}`}>
          <div className={`${classes.listing}`} >
            <p>{listing.username}</p>
            <p>{listing.condition}</p>
            <p>{listing.type}</p>
          </div>
          <div >
            {currUser !== listing.user_id ? <button onClick={addToCartHandler}>Add To Cart</button> : <p></p>}
            {isCreator(listing.user_id) && <button onClick={deleteHandler}>Delete</button>}
          </div>
        </div>
      </div>
    </>
  )
}
