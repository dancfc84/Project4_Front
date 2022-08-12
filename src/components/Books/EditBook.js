import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import baseUrl from "../../config"
import styles from './EditBook.module.css'

export default function CreateJob () {

  const navigate = useNavigate()

  const [formData, setFormData] = useState(
    {
      name: "",
      year_released: 0,
      pages: 0,
      description: "",
      image: "",
    }
  )

  const { bookId } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/books/${bookId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        console.log(data);
        setFormData({
          name: data[0].name,
          year_released: data[0].year_released,
          pages: data[0].pages,
          description: data[0].description,
          image: data[0].image,
        })
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [ bookId ])


  async function handleSubmit(e) {
    try {
      e.preventDefault()
      const { data } = await axios.put(`${baseUrl}/books/${bookId}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      console.log(data);
      navigate(`/books/${bookId}`)

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

  function handleDiscard () {
    navigate(`/books/${bookId}`)
  }
  
  return <>
    <div >
      <div className={styles.text_header}>
        <h2 className={styles.text_header}>Edit Book</h2>
      </div>
      <div className={styles.form_container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form_fields}>
            <label >Name</label>
            <div >
              <input
                type="text"
                name={'name'}
                value={formData.name}
                onChange={handleChange}
              />
            </div>
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
          <div >
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
   
          <div className={styles.button_container}>
            <button className={styles.submit_button}>Submit</button>
            <button className={styles.discard_button}onClick={handleDiscard}>Discard</button>
          </div>
        </form>
      </div>

    </div>
  </>

}