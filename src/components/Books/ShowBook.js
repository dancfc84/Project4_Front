import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import BookComment from "./BookComment"
import BookListing from "../Listings/BookListing"
import ListModal from "../Listings/ListModal"
import axios from "axios"
import baseUrl from "../../config"
import { getLoggedInUserId } from "../../lib/auth"


export default function ShowBook() {

  const currUser = getLoggedInUserId();

  const [book, setBook] = useState([])
  const [comments, setComments] = useState([])
  const [listings, setListings] = useState([])
  const [formDataInput, setFormDataInput] = useState({
    content: "",
  })

  const navigate = useNavigate();

  const { bookId } = useParams();

  const [ showListingModal, setShowListingModal] = useState(false)


  //get book information

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/books/${bookId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        setBook(data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [bookId])

  // get comments for the specific book

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/books/${bookId}/comments`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        setComments(data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [bookId])

  // get listings for the book

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/books/${bookId}/listing`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        setListings(data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [bookId])


  console.log(listings);
  
  async function handleDelete () {
    console.log(bookId);
    try {
      const { data } = await axios.delete(`${baseUrl}/books/${bookId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChangeEvent (e) {
    const { name, value } = e.target
    setFormDataInput({
      ...formDataInput,
      [name]: value,
    })
  }


  function handleEdit () {
    navigate(`/books/edit/${bookId}`)
  }

  async function handleCommentPost () {
    try {
      const { data } = await axios.post(`${baseUrl}/books/${bookId}/comments`, formDataInput, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCommentDelete (commentId) {
    try {
      const { data } = await axios.delete(`${baseUrl}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  } 

  // Modal Functions

  const hideModalHandler = () => {
    setShowListingModal(false)
  }

  const showModalHandler = () => {
    setShowListingModal(true)
  }

  console.log(formDataInput);

  return (
    <>
      <section className="section">
        <div className="container">
          {book ? (
            <div>
              <h2>{book.name}</h2>
              <hr />
              <div className="columns">
                <div >
                  <figure >
                    <img src={book.image} alt={book.name} />
                  </figure>
                  <div>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleEdit}>Edit Book</button>
                    <button onClick={showModalHandler}>Sell Book</button>
                  </div>
                </div>
                <div>
                  <h4>Year Released</h4>
                  <p>{book.year_released}</p>
                  <h4>Pages</h4>
                  <p>{book.pages}</p>
                  <h4>Book Description</h4>
                  <p>{book.description}</p>
                </div>
              </div>
            </div>
            
          ) : (
            <p>...loading</p>
          )}
        </div>
      </section>
      <section>
        <article>
          {currUser && <div>
            <div >
              <form onSubmit={handleCommentPost}>
                <div >
                  <textarea
                    type="text"
                    name={"content"}
                    value={formDataInput.content}
                    onChange={handleChangeEvent}
                    placeholder="Type Comment Here"
                  /> 
                  <button>
                    Comment
                  </button>

                </div>
              </form>
            </div>
          </div> }
        </article>
        <article>
          {currUser && comments.map((comment) => {
            return (
              <BookComment
                key={comment._id}
                comment={comment}
                bookId={bookId}
                handleCommentDelete={handleCommentDelete}
              />
            );
          })}
        </article>
        <article>
          <h2><strong>This book is offered by</strong></h2>
          {currUser && listings.map((listing) => {
            return (
              <BookListing
                key={listing.id}
                listing={listing}
              />
            );
          })}
        </article>
        {
          showListingModal && <ListModal
            bookId={bookId}
            hideModalHandler={hideModalHandler}
          />
        }
      </section>
    </>
  )
}