/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import baseUrl from "../../config"
import styles from './CreateAuthor.module.css'

export default function CreateAuthor () {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
  })

  const handleFormSubmit =  async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${baseUrl}/authors/create`, formData,  {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      navigate(`/books`)
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

  console.log(formData);

  return (
    <section>
      <div>
        <div className={styles.text_header}>
          <h2 className={styles.text_header}>Create Author</h2>
        </div>
        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={handleFormSubmit}>
            <div className={styles.form_fields}>
              <label>First Name</label>
            </div>
            <div>
              <input
                type="text"
                name={'first_name'}
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.form_fields}>
              <label>Last Name</label>
            </div>
            <div>
              <input
                type="text"
                name={'last_name'}
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.button_container}>
              <button className={styles.submit_button}>Create Author</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}