import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import baseUrl from "../../config"

export default function CreateJob () {

  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    {
      name: "Atonement",
      year_released: 2002,
      pages: 384,
      description: "On the hottest day of the summer of 1935, thirteen-year-old Briony Tallis sees her sister Cecilia strip off her clothes and plunge into the fountain in the garden of their country house",
      image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1319045627l/9961.jpg",
    }
  )

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
          <button>Create Book</button>
        </form>
      </div>
    </div>
  </>

}