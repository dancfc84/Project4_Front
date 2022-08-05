/* eslint-disable no-unused-vars */
import { createContext } from "react"

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext