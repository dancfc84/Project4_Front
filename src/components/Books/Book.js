import React from "react"
import { Link } from "react-router-dom"



const Book = (props) => {

  console.log(props.bookInfo.id);

  return <div >
    <Link  to={`/books/${props.bookInfo.id}`}>
      <div >
        <div >
          <div >{props.bookInfo.name}</div>
        </div>
        <div >
          <figure  >
            <img src={props.bookInfo.image} alt={props.name} />  
          </figure>
        </div>
        <div >
          <p></p>
        </div>
      </div>
    </Link>
  </div>
}

export default Book

