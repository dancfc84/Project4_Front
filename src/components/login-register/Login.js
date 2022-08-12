import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import baseUrl from "../../config"
import styles from "./Login.module.css"


export default function Login() {

  const navigate = useNavigate()


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${baseUrl}/login`, formData)
      console.log(data);
      localStorage.setItem("token", data.token)
      localStorage.setItem("loggedIn", true)
      navigate('/books')
    } catch {
      console.log("issues");
    }
  }

  const createAccountHandler = () => {
    navigate('/register')
  }

  console.log(formData);

  return <>
    <section>
      <div>
        <div className={styles.text_header}>
          <h2>Sign In</h2>
        </div>
        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.form_fields}>
              <label>Email</label>
              <div>
                <input
                  type="text"
                  name={"email"}
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Email"
                />
              </div>
            </div>

            <div className={styles.form_fields}>
              <label>Password</label>
              <div>
                <input
                  type="password"
                  name={"password"}
                  value={formData.password}
                  onChange={handleFormChange}
                  placeholder="Password"
                />{" "}
              </div>
            </div>

            <div className={styles.button_container}>
              <button
                className={styles.submit_button}
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className={styles.create_button}
                type="button"
                onClick={createAccountHandler}
              >
                Create account
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  </>
}