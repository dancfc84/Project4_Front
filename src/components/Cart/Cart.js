import React, { useContext } from "react"
import Modal from "../UI/Modal"
import CartContext from "../../store/cart-context"
import CartItem from "./CartItem"
import { useNavigate } from "react-router-dom";
import classes from './Cart.module.css'

export default function Cart (props) {

  const navigate = useNavigate();
  const cartCtx = useContext(CartContext)
  const cartItemsAmount = cartCtx.items.length



  //Whenever add to cart button is pressed, the cart context 
  const removeFromCartHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const checkoutHandler = () => {
    props.onHideCart()
    navigate("/checkout")
  }

  const cartItems = (
    <ul className={`${classes.cart_item_container}`}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          condition={item.condition}
          type={item.type}
          onRemove={removeFromCartHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  console.log(cartCtx.items.length);

  return (

    <Modal hideModalHandler={props.onHideCart}>
      {cartItems}
      <div className={`${classes.price_container}`}>
        <p><span id={`${classes.total_text}`}>Total</span>{cartCtx.items.length} {cartItemsAmount > 1 ? <span>credits</span> : <span>credit</span>}</p>
      </div>
      <div className={`${classes.button_container}`}>
        <button className={classes.close_button} onClick={props.onHideCart}>Close</button>
        <button className={classes.checkout_button} onClick={checkoutHandler}>Checkout</button>
      </div>
    </Modal>
  )

}