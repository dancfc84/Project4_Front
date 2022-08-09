import React, { useContext } from "react"
import CartContext from "../../store/cart-context"

import CartIcon from "./CartIcon"
import classes from "./NavCartButton.module.css"

export default function CartButton (props) {

  //This will be reevaluated and updated every time the context is changed 
  const cartCtx = useContext(CartContext)
  const numCartItems = cartCtx.items.length


  return <>
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon} >
        <CartIcon />
      </span>
      <span className={classes.badge} >{numCartItems}</span>
    </button>
  </>
}