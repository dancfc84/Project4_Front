import React, { useContext } from "react"
import Modal from "../UI/Modal"
import CartContext from "../../store/cart-context"
import CartItem from "./CartItem"
import { useNavigate } from "react-router-dom";

export default function Cart (props) {

  const navigate = useNavigate();

  const cartCtx = useContext(CartContext)


  //Whenever add to cart button is pressed, the cart context 
  const removeFromCartHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const checkoutHandler = () => {
    props.onHideCart()
    navigate("/checkout")
  }

  const cartItems = (
    <ul>
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
      <div>
        <p>Total = {cartCtx.items.length} tokens</p>
        <button onClick={props.onHideCart}>Close</button>
        <button onClick={checkoutHandler}>Checkout</button>
      </div>
    </Modal>
  )

}