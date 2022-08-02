import React, { useEffect, useState } from "react"
import axios from "axios"
import baseUrl from "../../config"
import { useNavigate } from "react-router-dom"
import { getLoggedInUserId } from "../../lib/auth"


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


  async function handleSubmit () {

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
      <div >
        <form onSubmit={handleSubmit}>
          <div >
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
          <div>
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
          <div >
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
          <div >
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
          <div >
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
          <div >
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
          <div >
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
          <div >
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
          <button>Submit Changes</button>
        </form>
      </div>
      <button onClick={handleDiscard}>Discard Changes</button>
    </div>

  </>
}