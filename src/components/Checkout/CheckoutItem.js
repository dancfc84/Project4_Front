import classes from '../Cart/CartItem.module.css'
import React, { useContext } from "react"
import CartContext from '../../store/cart-context';

const CheckoutItem = (props) => {

  const cartCtx = useContext(CartContext)

  console.log(props);

  const removeFromCartHandler = (id) => {
    cartCtx.removeItem(id)
  }

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{props.name}</span>
          <span className={classes.amount}>{props.condition}</span>
          <span className={classes.amount}>{props.type}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeFromCartHandler.bind(null, props.id)}>Remove</button>
      </div>
    </li>
  );
};

export default CheckoutItem;