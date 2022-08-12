import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import baseUrl from "../../config"
import styles from "./CreateBook.module.css"


export default function CreateJob () {

  const navigate = useNavigate();


  const [genres, setGenres] = useState()
  const [authors, setAuthors] = useState()

  const [formData, setFormData] = useState(
    {
      name: "Atonement",
      author_id: 0,
      genre_id: 0,
      year_released: 2002,
      pages: 384,
      description: "On the hottest day of the summer of 1935, thirteen-year-old Briony Tallis sees her sister Cecilia strip off her clothes and plunge into the fountain in the garden of their country house",
      image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1319045627l/9961.jpg",
    }
  )


  useEffect(()=> {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/authors`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        setAuthors(data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [])


  
  useEffect(()=> {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/genres`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        setGenres(data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [])


  async function handleSubmit(e) {
    try {
      e.preventDefault()
      const { data } = await axios.post(`${baseUrl}/books`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      console.log(data);
      navigate('/books')

    } catch (error) {
      console.log(error);
    }
  }

  function handleChange (e) {
    const { name, value } = e.target
    setFormData( {
      ...formData,
      [name]: value,
    })
  }

  const handleGenreChange = event => {
    console.log(event.target.value);
    setFormData({
      ...formData,
      genre_id: event.target.value,
    })
  };

  const handleAuthorChange = event => {
    console.log(event.target.value);
    setFormData({
      ...formData,
      author_id: event.target.value,
    })
  };

  console.log(formData);

  return <>
    { authors && genres ? <div >
      <div className={styles.text_header}>
        <h2 className={styles.text_header}>Create Book</h2>
      </div>
      <div className={styles.form_container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form_fields}>
            <label >Name</label>
            <div>
              <input
                type="text"
                name={'name'}
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.form_fields}>
            <label >Author</label>
            <select onChange={handleAuthorChange}>
              {authors.map(option => (
                <option key={option.id} value={option.id}>
                  {`${option.first_name} ${option.last_name}`}
                </option>
              ))}
            </select>
            <p id={`${styles.author_link}`}>If the author is not in list, please create <a href='/authors/create'>here</a></p>
          </div>
          <div className={styles.form_fields}>
            <label >Genre</label>
            <select onChange={handleGenreChange}>
              {genres.map(option => (
                <option key={option.id} value={option.id}>
                  {option.genre}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.form_fields}>
            <label >Year Released</label>
            <div >
              <input
                type="text"
                name={'year_released'}
                value={formData.year_released}
                onChange={handleChange}
              />

            </div>
          </div>
          <div className={styles.form_fields}>
            <label >How many pages</label>
            <div >
              <input
                type="textarea"
                name={'pages'}
                value={formData.pages}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.form_fields}>
            <label >Description</label>
            <div >
              <input
                type="text"
                name={'description'}
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.form_fields}>
            <label >Cover Image</label>
            <div>
              <input

                type="text"
                name={'image'}
                value={formData.image}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>

          </div>
          <div className={styles.button_container}>
            <button className={styles.submit_button}>Create Book</button>
          </div>
        </form>
      </div>
    </div> : <p>Loading Data</p>}
  </>

}