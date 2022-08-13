import React, { useEffect, useState } from "react"
import axios from "axios"
import baseUrl from "../../config"
import { getLoggedInUserId } from "../../lib/auth"
import styles from './Profile.module.css'
import { useNavigate } from "react-router-dom"
import Wishlist from "../Books/WishlistBook"

export default function Profile () {

  const navigate = useNavigate()

  const [ profile, setProfile ] = useState({})
  const [ wishlist, setWishlist ] = useState()
  const [ removedFromWishlist, setRemovedFromWishlist ] = useState()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/users/${getLoggedInUserId()}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        console.log(data);
        setProfile(data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/books/wishlist/${getLoggedInUserId()}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        console.log(data);
        setWishlist(data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [removedFromWishlist])

  const editButtonHandler = () => {
    navigate('/profile/edit')
  }

  console.log(profile);


  return <>
    <section className={styles.profile_section}>
      <div className={styles.profile_container}>
        <div>
          <img className={styles.profile_image} src="https://avatars.githubusercontent.com/u/88556426?v=4" alt="profile pic"></img>
        </div>
        <h1>{`${profile.first_name} ${profile.last_name}`}</h1>
        <div className={styles.text_container}>
          <h3>Address</h3>
          <p>{profile.address1}</p>
          <p>{profile.address2}</p>
          <p>{profile.postcode}</p>
          <h3>Username</h3>
          <p>{profile.username}</p>
          <h3>Credits</h3>
          <p>{profile.credits}</p>
        </div>
        <div className={styles.button_container}>
          <button onClick={editButtonHandler} className={styles.edit_button}>Edit Profile</button>
        </div>
      </div>

      {wishlist && wishlist.length > 0 ? <div className={styles.wishlist_header_container}>
        <h3>Your Wishlist</h3>
      </div> : <p></p>}

      <div className={styles.card_container}>
        {wishlist ? wishlist.map((book, i) => {
          return <Wishlist
            key={i}
            bookInfo={book}
            setRemovedFromWishlist={setRemovedFromWishlist}
          />

        })
          : <p>Loading books</p>
        }

      </div>
    </section>
  </>

}