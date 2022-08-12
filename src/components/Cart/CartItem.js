import classes from './CartItem.module.css';

const CartItem = (props) => {

  return (
    <li className={classes.cart_item}>
      <div>
        <div className={classes.summary}>
          <span className={classes.price}>{props.name}</span>
          <span className={classes.amount}>{props.condition}</span>
          <span className={classes.amount}>{props.type}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button className={classes.remove_button} onClick={props.onRemove}>Remove</button>
      </div>
    </li>
  );
};

export default CartItem;