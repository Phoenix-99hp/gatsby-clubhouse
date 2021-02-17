import React from "react"
// import { UserContext } from '../Provider';
import { Link } from "gatsby"
// import { isLoggedIn, getUser } from "../services/auth"
import styles from "./AlreadySignedIn.module.scss"

const AlreadySignedIn = ({ user }) => {
  console.log(user)
  return (
    <div>
      <h4>
        Looks like you're already signed in,
        <span
          className={`${styles.username} ${
            user.isAdmin
              ? styles.admin
              : user.isMember
              ? styles.member
              : styles.nonMember
          }`}
        >
          {user.username}
        </span>
      </h4>
      <Link className={styles.link} to="/dashboard">
        Here's a link to your dashboard
      </Link>
    </div>
  )
}

export default AlreadySignedIn
