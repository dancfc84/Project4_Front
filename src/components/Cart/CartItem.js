import classes from './CartItem.module.css';

const CartItem = (props) => {

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
        <button onClick={props.onRemove}>Remove</button>
      </div>
    </li>
  );
};

export default CartItem;