import React, { useState } from 'react'
import axios from "axios"
import baseUrl from "../../config"
import { useNavigate } from 'react-router-dom'


export default function Login () {


  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    address1: "",
    address2: "",
    postcode: "",
    county: "",
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
      // eslint-disable-next-line no-unused-vars
      const { data } = await axios.post(`${baseUrl}/register`, formData)
      navigate('/books')
    } catch {
      console.log("issues");
    }
  }

  console.log(formData);

  return <>
    <section>
      <div>
        <h2>Register</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>First Name</label>
            <div>
              <input
                type="text"
                name={"first_name"}
                value={formData.first_name}
                onChange={handleFormChange}
                placeholder="First Name"
              />
            </div>
          </div>

          <div>
            <label>Last Name</label>
            <div>
              <input
                type="text"
                name={"last_name"}
                value={formData.last_name}
                onChange={handleFormChange}
                placeholder="Last Name"
              />
            </div>
          </div>

          <div>
            <label>Username</label>
            <div>
              <input
                type="text"
                name={"username"}
                value={formData.username}
                onChange={handleFormChange}
                placeholder="Username"
              />
            </div>
          </div>

          <div>
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

          <div>
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

          <div>
            <label>Address 1</label>
            <div>
              <input
                type="text"
                name={"address1"}
                value={formData.address1}
                onChange={handleFormChange}
                placeholder="Address"
              />
            </div>
          </div>

          <div>
            <label>Address 2</label>
            <div>
              <input
                type="text"
                name={"address2"}
                value={formData.address2}
                onChange={handleFormChange}
                placeholder="Address"
              />
            </div>
          </div>


          <div>
            <label>Postcode</label>
            <div>
              <input
                type="text"
                name={"address2"}
                value={formData.postcode}
                onChange={handleFormChange}
                placeholder="Postcode"
              />
            </div>
          </div>

          <div>
            <label>County</label>
            <div>
              <input
                type="text"
                name={"county"}
                value={formData.county}
                onChange={handleFormChange}
                placeholder="County"
              />
            </div>
          </div>

        
          <div >
            <div >
              <button
                type="button"
                onClick={handleLogin}
              >
                Register
              </button>
            </div>
          </div>
        </form>
        <div>
          <button
            type="button"
          >
            Already have an Account - Sign In 
          </button>
        </div>

      </div>
    </section>
  </>
}