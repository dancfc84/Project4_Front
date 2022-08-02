import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import baseUrl from "../../config"

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
        setFormData(data)
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
      <div >
        <form onSubmit={handleSubmit}>
          <div >
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
          <div>
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
          <div >
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
          <div >
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
          <button>Submit Changes</button>
        </form>
      </div>
      <button onClick={handleDiscard}>Discard Changes</button>
    </div>

  </>

}