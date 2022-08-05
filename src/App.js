/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'
import Navbar from './components/UI/Navbar'
import BookIndex from './components/Books/BookIndex'
import ShowBook from './components/Books/ShowBook'
import EditBook from './components/Books/EditBook'
import CreateBook from './components/Books/CreateBook'
import Profile from "./components/Profile/Profile"
import EditProfile from './components/Profile/EditProfile'
import Login from "./components/login-register/Login"
import Register from "./components/login-register/Register"
import Cart from "./components/Cart/Cart"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CartProvider from "./store/CartProvider"
import Checkout from "./components/Checkout/Checkout"
import CartContext from './store/cart-context'

function App() {

  const [ cartIsShown, setCartIsShown ] = useState(false)

  const showCartHandler = () => {
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
  }

  const [ cartCtx , setCartCtx ] = useState(useContext(CartContext))

  return (
    <CartProvider>
      <Router>
        {cartIsShown && <Cart onHideCart={hideCartHandler}/>}
        <Navbar onShowCart={showCartHandler}  />
        <Routes>
          <Route path="/books" element={<BookIndex />} />
          <Route path="/books/:bookId" element={<ShowBook />}/>
          <Route path="/books/create" element={<CreateBook />}/>
          <Route path="/books/edit/:bookId" element={<EditBook />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/profile/edit" element={<EditProfile />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/checkout" element={<Checkout />}/>
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
