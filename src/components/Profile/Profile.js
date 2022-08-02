import React, { useEffect, useState } from "react"
import axios from "axios"
import baseUrl from "../../config"
import { getLoggedInUserId } from "../../lib/auth"

export default function Profile () {
  const [ profile, setProfile ] = useState({})

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/users/${getLoggedInUserId()}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        console.log(data);
        setProfile(data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [])

  console.log(profile);

  return <>
    <section>
      <div>
        <h2>Name: {`${profile.first_name} ${profile.last_name}`}</h2>
        <div>
          <h3>Address1: {profile.address1}</h3>
          <h3>Address2: {profile.address2}</h3>
          <h3>Postcode: {profile.postcode}</h3>
          <h3>Username: {profile.username}</h3>
          <h3>Credits: {profile.credits}</h3>
        </div>
      </div>
    </section>
  </>

}