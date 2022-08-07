/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react"
import CheckoutItem from "./CheckoutItem"
import CartContext from "../../store/cart-context"
import axios from "axios"
import baseUrl from "../../config"
import { getLoggedInUserId } from "../../lib/auth"
import { useNavigate } from "react-router-dom";

export default function Checkout () {

  const navigate = useNavigate();

  const cartCtx = useContext(CartContext)

  const [ user, setUser ] = useState()
  const [ updatedUser, setUpdatedUser ] = useState()

  // eslint-disable-next-line no-unused-vars
  const booksTotal = cartCtx.items.length
  console.log(booksTotal);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/users/${getLoggedInUserId()}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        console.log(data);
        setUser(data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [])


  useEffect(() => {
    const getData = async () => {
      if (updatedUser !== undefined)

        try {
          const { data } = await axios.put(`${baseUrl}/users/${getLoggedInUserId()}`, updatedUser, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          })
          console.log(data);
          clearCartListings()
        } catch (error) {
          console.log(error);
        }
    }
    getData()
  }, [updatedUser])


  const buyBooksHandler =  () => {

    if (user.credits >= booksTotal) {
      const newUserBalance = user.credits - booksTotal
      console.log(user);

      setUpdatedUser({
        ...user,
        credits: newUserBalance,
      });
    } else {
      console.log("user does not have the credit");
    }
  }

  const clearCartListings = async () => {
    for (const id in cartCtx.items) {
      try {
        const { data } = await axios.delete(`${baseUrl}/listings/${cartCtx.items[id].id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        cartCtx.removeItem(cartCtx.items[id].id)
      } catch (error) {
        console.log(error);
      }
    }

    console.log("make it empty");
    localStorage.removeItem('cart')
    cartCtx.items = []
    navigate('/books')
  }


  return (
    <>
      <section>
        <h2>Checkout</h2>
        <div>
          {booksTotal > 0 ? cartCtx.items.map((item) => {
            return (
              <CheckoutItem
                key={item.id}
                id={item.id}
                name={item.name}
                condition={item.condition}
                type={item.type}
              />)
          }) : <p>Your cart is empty</p>}
        </div>
        <div>
          <button onClick={buyBooksHandler}>Buy Books</button>
        </div>
      </section>
    </>
  )
}