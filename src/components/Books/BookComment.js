
import { getLoggedInUserId } from "../../lib/auth.js";


export default function BookComment(props) {

  console.log(props);

  const currUser = getLoggedInUserId();
  const commentId = props.comment.id


  async function handleCommentDeleteClick () {
    props.handleCommentDelete(commentId)
  }


  return (
    <>
      <div key={commentId}>
        <div>
          <div >
            <p><strong>Username</strong> posted on
              {props.comment.createdAt}</p>
            <p>{props.comment.content}</p>
          </div>
          <div >
            {currUser && <button onClick={handleCommentDeleteClick}>Delete</button>}
          </div>
        </div>
      </div>
    </>
  )
}
