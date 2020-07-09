import React from "react"
// import { UserContext } from '../Provider';
import { Link } from "gatsby"
import styles from "./AlreadySignedIn.module.scss"

const AlreadySignedIn = ({ user }) => {
  return (
    <div>
      <h4>Looks like you're already signed in {user.username}...</h4>
      <Link className={styles.link} to="/dashboard">
        Here's a link to your dashboard
      </Link>
    </div>
  )
}

export default AlreadySignedIn
