
// eslint-disable-next-line no-unused-vars
import { getLoggedInUserId, isCreator } from "../../lib/auth.js";
import axios from "axios";
import baseUrl from "../../config.js";
import classes from './BookComment.module.css'
import 'bulma'

export default function BookComment(props) {

  console.log(props);

  const commentId = props.comment.id

  async function handleCommentDelete () {
    console.log(commentId);
    try {
      const { data } = await axios.delete(`${baseUrl}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      props.setDeletedComment(data)

    } catch (error) {
      console.log(error);
    }
  } 


  return (
    <>
      <div key={commentId}>
        <div className={`media-content ${classes.bookcomment_container}`}>
          <div className={` content ${classes.bookcomment}`}>
            <p>
              <strong>{props.comment.username}</strong> posted on 
              {` ${props.comment.created_at}`}
            </p>
            <p>
              {props.comment.content}
            </p>
          </div>
          <div >
            {isCreator(props.comment.user_id) && <button onClick={handleCommentDelete}>Delete</button>}
          </div>
        </div>
      </div>
    </>
  )
}
