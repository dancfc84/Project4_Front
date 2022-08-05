import React, { useContext } from "react"
import CartContext from "../../store/cart-context"
import baseUrl from "../../config";
import axios from "axios";


import { getLoggedInUserId } from "../../lib/auth.js";


export default function BookListing(props) {

  const cartCtx = useContext(CartContext)

  const listing = props.listing;

  const currUser = getLoggedInUserId();

  //Whenever add to cart button is pressed, the cart context 
  const addToCartHandler = () => {
    cartCtx.addItem({
      id: listing.id,
      name: listing.name,
      condition: listing.condition,
      type: listing.type,
      user: listing.username,
    })
  }

  const deleteHandler = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await axios.delete(`${baseUrl}/listings/${listing.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
    } catch (error) {
      console.log(error);
    }
  }
  


  return (
    <>
      <div key={listing.id}>
        <div>
          <div >
            <p>{listing.username}</p>
            <p>{listing.condition}</p>
            <p>{listing.type}</p>
          </div>
          <div >
            {currUser && <button onClick={addToCartHandler}>Add To Cart</button>}
            {currUser === listing.username && <button onClick={deleteHandler}>Delete</button>}
          </div>
        </div>
      </div>
    </>
  )
}
