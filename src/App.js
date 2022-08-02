import React from 'react'
import Navbar from './components/UI/Navbar'
import BookIndex from './components/Books/BookIndex'
import ShowBook from './components/Books/ShowBook'
import EditBook from './components/Books/EditBook'
import CreateBook from './components/Books/CreateBook'
import Profile from "./components/Profile/Profile"
import EditProfile from './components/Profile/EditProfile'
import Login from "./components/login-register/Login"
import Register from "./components/login-register/Register"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/books" element={<BookIndex />} />
        <Route path="/books/:bookId" element={<ShowBook />}/>
        <Route path="/books/create" element={<CreateBook />}/>
        <Route path="/books/edit/:bookId" element={<EditBook />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/profile/edit" element={<EditProfile />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>

      </Routes>
    </Router>
  )
}

export default App
