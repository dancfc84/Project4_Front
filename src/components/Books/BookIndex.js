
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import baseUrl from "../../config"
import Book from "./Book"

export default function BookIndex() {

  const [books, setBooks] = useState([])
  const [search, setSearch] = useState("")


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/books`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        setBooks(data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [])

  console.log();

  function filterBooks() {
    return books.filter((book) => {
      return (book["name"].toLowerCase().includes(search.toLowerCase())
      )
    })
  }

  console.log(books);

  return (
    <section >
      <div>
        <input
          value={search}
          placeholder={"SEARCH books"}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        {books ? filterBooks().map((book, i) => {
          return <Book
            key={i}
            bookInfo={book}
          />
        })
          : <p>Loading books</p>
        }
      </div>
    </section>
  )
}
