import CartContext from "./cart-context"
import { useEffect, useReducer } from 'react'



const defaultCartState = JSON.parse(localStorage.getItem("cart")) || { items: [] }



//state is data before an update, action is the data being added/removed
const cartReducer = (state, action) => {

  if (action.type === 'ADD') {
    //Use concat as it creates a new array
    //action.item should contain all the data required to create item in cart
    //logic so that it only adds listing once!
    const existingItem = state.items.findIndex(
      (item) => item.id === action.item.id
    )
    if (existingItem === 0) {
      return {
        items: state.items,
      }
    }
    const updatedItems = state.items.concat(action.item)
    return {
      items: updatedItems,
    }
  }

  if (action.type === 'REMOVE') {
    const updatedItems = state.items.filter(item => item.id !== action.id) 
    return {
      items: updatedItems,
    }
  }

  return defaultCartState
}


//This component manages the cart context data and fucntions and provides access to the data for any of the components that want it
//You can put this in app.js but its better to keep it leaner and keep it seperate 

export default function CartProvider (props) {

  //useReducer takes two arguments, initial state and reducer function, returns an array with two items, the current state and the dispatch function
  //You can then call dispatchCartAction function then the type stipulated will decide what code is executed
  const [ cartState, dispatchCartAction ] = useReducer(cartReducer, defaultCartState);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState))
  }, [cartState])



  //These will be called from certain components
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD' , item: item })
  }

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id })
  }

  
  const cartContext = {
    items: cartState.items,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  }

  //props.children below allows us to wrap any component, allowing them access
  //You need to add the cartContext object set out above
  return <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
}