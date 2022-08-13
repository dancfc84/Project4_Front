/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import BookComment from "./BookComment"
import BookListing from "../Listings/BookListing"
import ListModal from "../Listings/ListModal"
import LoginRegisterModal from '../login-register/LoginRegisterModal';
import axios from "axios"
import baseUrl from "../../config"
import { getLoggedInUserId, isCreator } from "../../lib/auth"
import classes from './showbook.module.css'

export default function ShowBook() {

  const currUser = getLoggedInUserId();

  const [book, setBook] = useState()
  const [comments, setComments] = useState([])
  const [listings, setListings] = useState([])

  const [likes, setLikes] = useState()
  const [isHeartRed, setIsHeartRed] = useState()

  const [deletedListing, setDeletedListing] = useState([])
  const [createdListing, setCreatedListing] = useState([])
  const [deletedComment, setDeletedComment] = useState([])
  const [createdComment, setCreatedComment] = useState([])

  const [formDataInput, setFormDataInput] = useState({
    content: "",
  })

  const navigate = useNavigate();

  const { bookId } = useParams();

  const [ showListingModal, setShowListingModal] = useState(false)
  const [ showLoginRegisterModal, setShowLoginRegisterModal] = useState(false)

  //get book information

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/books/${bookId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        console.log(data);
        setBook(data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [bookId])

  useEffect(() => {
    const getData = async () => {

      console.log(currUser, bookId);
      try {
        const { data } = await axios.get(`${baseUrl}/books/liked/${currUser}/${bookId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        console.log(data);
        if (data.length > 0) {
          setIsHeartRed(true)
        } else {
          setIsHeartRed(false)
        }
      } catch (error) {
        console.log(`could not get like information`);
      }
    }
    getData()
  }, [isHeartRed])

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
  }, [ deletedComment, createdComment ])

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
  }, [bookId, deletedListing, createdListing])

  
  async function handleDelete () {
    console.log(bookId);
    try {
      const { data } = await axios.delete(`${baseUrl}/books/${bookId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      console.log(data);
      setFormDataInput({
        content: "",
      })
      navigate(`/books`)
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

  console.log(isHeartRed);
  const handleLike = async () => {

    if (isHeartRed === true) {
      try {
        const { data } = await axios.delete(`${baseUrl}/books/liked/${getLoggedInUserId()}/${bookId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        console.log(data);
        setIsHeartRed(false)

      } catch (error) {
        console.log(error);
      }

    } else {

      try {
        console.log("this way liked");
        const { data } = await axios.post(`${baseUrl}/books/wishlist/${bookId}/${currUser}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        console.log(data);
        setIsHeartRed(true)
      } catch (error) {
        console.log("getting like errors");
      }
    }
  }


  function handleEdit () {
    navigate(`/books/edit/${bookId}`)
  }

  async function handleCommentPost (e) {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${baseUrl}/books/${bookId}/comments`, formDataInput, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      console.log(data);
      setCreatedComment(data)
      setFormDataInput({
        content: "",
      })
    } catch (error) {
      console.log(error);
    }
  }


  // Modal Functions

  const hideModalHandler = () => {
    setShowListingModal(false)
  }

  const showModalHandler = () => {
    
    currUser ? setShowListingModal(true) : setShowLoginRegisterModal(true)
  }


  return (
    <>
      {book ?
        <div className={`section ${classes.main_container}`}>
          <section className={`section ${classes.book_section}`}>
            <h2 className={classes.book_title}>{book[0].name}</h2>
            <div className={`${classes.book_container}`}>
              <div className={`column is-half ${classes.left_col}`}>
                <figure >
                  <img src={book[0].image} alt={book[0].name} />
                </figure>

                <div className={classes.likes_container}>
                  <div onClick={handleLike} className={`${classes.heart} ${isHeartRed && classes.is_active}`}></div>
                  {/*                   <p>{job.likes} {job.likes > 1 ? "likes" : "like"}</p> */}
                  {isHeartRed ?  <h4 className={classes.likes_text}>Remove from wishlist</h4> : <h4 className={classes.likes_text}>Add to wishlist</h4>}
                </div>

                <div className={`${classes.admin_buttons_container}`}>
                  {isCreator(book[0].user_id) && <button className={classes.del_button} onClick={handleDelete}>Delete</button>}
                  {isCreator(book[0].user_id) && <button className={classes.edit_button} onClick={handleEdit}>Edit Book</button>}
                  <button className={classes.sell_button} onClick={showModalHandler}>Sell Book</button>
                </div>
              </div>
              <div className={`column is-half ${classes.right_col}`}>
                <h4>Year Released</h4>
                <p>{book[0].year_released}</p>
                <h4>Pages</h4>
                <p>{book[0].pages}</p>
                <h4>Author</h4>
                <p>{`${book[0].first_name} ${book[0].last_name}`}</p>
                <h4 id={`${classes.book_description_text}`}>Book Description</h4>
                <p id={`${classes.book_description_text}`}>{book[0].description}</p>
              </div>
            </div>
          </section>
          <section className={`section ${classes.comment_listing_section}`}>
            <div className={`${classes.comment_listing_container}`}>
              <article className={`column is-half ${classes.comment_article}`}>
                {currUser && <div>
                  <form onSubmit={handleCommentPost}>
                    <div className={`${classes.comment_container}`}>
                      <textarea
                        type="text"
                        name={"content"}
                        value={formDataInput.content}
                        onChange={handleChangeEvent}
                        placeholder="Type Comment Here"
                        className={`${classes.comment_input}`}
                      /> 
                      <button>
                        Comment
                      </button>
                    </div>
                  </form>
                </div> }
                {currUser && comments.map((comment) => {
                  return (
                    <BookComment
                      key={comment._id}
                      comment={comment}
                      bookId={bookId}
                      setDeletedComment={setDeletedComment}
                    />
                  );
                })}
              </article>
              <article className={`column is-half`}>
                <div >
                  {listings.length === 0 ? <p></p> : <h2 id={`${classes.book_offer_title}`}><strong>This book is offered by</strong></h2>}
                  {listings.map((listing) => {
                    return (
                      <BookListing
                        key={listing.id}
                        listing={listing}
                        setDeletedListing={setDeletedListing}
                        setLoginRegisterModal={setShowLoginRegisterModal}
                      />
                    );
                  })}
                </div>
              </article>
            </div>
            {
              showListingModal && <ListModal
                bookId={bookId}
                hideModalHandler={hideModalHandler}
                setCreatedListing={setCreatedListing}
              />
            }
            {
              showLoginRegisterModal && <LoginRegisterModal
                setLoginRegisterModal={setShowLoginRegisterModal}
              />
            }
          </section>
        </div> : <p>Book loading</p>}
    </>
  )
}