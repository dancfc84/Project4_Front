/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react"
import CheckoutItem from "./CheckoutItem"
import CartContext from "../../store/cart-context"
import axios from "axios"
import baseUrl from "../../config"
import { getLoggedInUserId } from "../../lib/auth"
import { useNavigate } from "react-router-dom";
import styles from './Checkout.module.css'

export default function Checkout () {

  const navigate = useNavigate();

  const cartCtx = useContext(CartContext)

  const [ user, setUser ] = useState()
  const [ updatedUser, setUpdatedUser ] = useState()
  const [ showCreditMessage, setShowCreditMessage ] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const booksTotal = cartCtx.items.length

  console.log(user);

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
      console.log("this way");
      if (updatedUser !== undefined)

        try {
          delete updatedUser["password"]
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
      setUpdatedUser({
        ...user,
        credits: newUserBalance,
      });
    } else {
      setShowCreditMessage(true)
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
    localStorage.removeItem('cart')
    cartCtx.items = []
    navigate('/purchase')
  }


  return (
    <>
      <section className={styles.section_container}>
        <div className={styles.checkout_container}>
          <div className={styles.header_container}>
            <h2>Checkout</h2>
          </div>
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
          <div className={`${styles.price_container}`}>
            <p><span id={`${styles.total_text}`}>Total</span>{cartCtx.items.length} tokens</p>
          </div>
          <div className={styles.buy_button_container}>
            <button className={styles.buy_book_button} onClick={buyBooksHandler}>Buy Books</button>
            {showCreditMessage && <p className={styles.noCredit_Message}> You do not have enough credits to make this purchase </p>}
          </div>
        </div>
      </section>
    </>
  )
}