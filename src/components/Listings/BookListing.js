
import { getLoggedInUserId } from "../../lib/auth.js";


export default function BookListing(props) {

  const listing = props.listing;

  const currUser = getLoggedInUserId();


  return (
    <>
      <div key={listing.id}>
        <div>
          <div >
            <p>{listing.username}</p>
            <p>{listing.condition}</p>
            <p>{listing.type}</p>
          </div>
          <div >
            {currUser && <button>Buy</button>}
            {currUser && <button>Delete</button>}
          </div>
        </div>
      </div>
    </>
  )
}
