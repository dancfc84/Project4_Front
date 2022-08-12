import classes from '../Cart/CartItem.module.css'
import React, { useContext } from "react"
import CartContext from '../../store/cart-context';

const CheckoutItem = (props) => {

  const cartCtx = useContext(CartContext)

  const removeFromCartHandler = (id) => {
    cartCtx.removeItem(id)
  }

  return (
    <ul>
      <li className={classes.cart_item}>
        <div>
          <div className={classes.summary}>
            <span className={classes.price}>{props.name}</span>
            <span className={classes.amount}>{props.condition}</span>
            <span className={classes.amount}>{props.type}</span>
          </div>
        </div>
        <div className={classes.actions}>
          <button className={classes.remove_button} onClick={removeFromCartHandler.bind(null, props.id)}>Remove</button>
        </div>
      </li>
    </ul>
  );
};

export default CheckoutItem;