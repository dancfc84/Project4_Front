import React, { useEffect, useState } from "react"
import axios from "axios"
import baseUrl from "../../config"
import { useNavigate } from "react-router-dom"
import { getLoggedInUserId } from "../../lib/auth"
import styles from './EditProfile.module.css'


export default function EditProfile () {

  const navigate = useNavigate()


  const [ formData, setFormData ] = useState({
    first_name: "",
    last_name: "",
    username: "",
    address1: "",
    address2: "",
    postcode: "",
    county: "",
    email: "",
  })


  useEffect(() => {
    const getData = async () => {

      try {
        const { data } = await axios.get(`${baseUrl}/users/${getLoggedInUserId()}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })

        setFormData(data)

      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [])


  function handleDiscard () {
    navigate("/profile")
  }


  async function handleSubmit (e) {

    e.preventDefault()

    console.log(formData);
    try {
      const { data } = await axios.put(`${baseUrl}/users/${getLoggedInUserId()}`, formData, {
        headers: {  Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      console.log(data);
      navigate('/profile')

    } catch (error) {

      console.log(error);
    }
  }

  function handleChange (e) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  console.log(formData);

  
  return <>
    <div >
      <div className={styles.text_header}>
        <h2 className={styles.text_header}>Edit Profile</h2>
      </div>
      <div className={styles.form_container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form_fields}>
            <label >First Name</label>
            <div >
              <input
                type="text"
                name={'first_name'}
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.form_fields}>
            <label >Last name</label>
            <div >
              <input
                type="text"
                name={'last_name'}
                value={formData.last_name}
                onChange={handleChange}
              />

            </div>
          </div>
          <div className={styles.form_fields}>
            <label >Username</label>
            <div >
              <input
                type="text"
                name={'username'}
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.form_fields}>
            <label >Email</label>
            <div >
              <input
                type="text"
                name={'email'}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.form_fields}>
            <label >Address1</label>
            <div>
              <input

                type="text"
                name={'address1'}
                value={formData.address1}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.form_fields}>
            <label >Address2</label>
            <div>
              <input

                type="text"
                name={'address2'}
                value={formData.address2}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.form_fields}>
            <label >County</label>
            <div>
              <input
                type="text"
                name={'county'}
                value={formData.county}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.form_fields}>
            <label >Postcode</label>
            <div>
              <input

                type="text"
                name={'postcode'}
                value={formData.postcode}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.button_container}>
            <button className={styles.submit_button}>Submit Changes</button>
            <button className={styles.discard_button} onClick={handleDiscard}>Discard Changes</button>
          </div>
        </form>
      </div>

    </div>

  </>
}