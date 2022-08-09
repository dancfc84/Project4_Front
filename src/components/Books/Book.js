import React from "react"
import { Link } from "react-router-dom"
import 'bulma'
import classes from './book.module.css'

const Book = (props) => {

  console.log(props.bookInfo);

  return <> 
    <Link  to={`/books/${props.bookInfo.id}`}>
      <div className={`card ${classes.card}`  }>
        <div >
          <figure className={`card-image`}>
            <img  src={props.bookInfo.image} alt={props.name} />  
          </figure>
          <div className={`card-content ${classes.card_text}`}>
            <div className={`card-image`} >{props.bookInfo.name}</div>
          </div>
          <div >
            <p></p>
          </div>
        </div>

      </div>
    </Link>
  </>
}

export default Book

