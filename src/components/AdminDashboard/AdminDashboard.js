import React from "react"
import { Link } from "gatsby"
import styles from "./AdminDashboard.module.scss"

const AdminDashboard = ({ handleSessionLogout, status }) => {
  return (
    <>
      <h2 id={styles.status}>
        <span id={styles.statusSpan}>Status: </span>
        {status}
      </h2>
      <div id={styles.firstOption} className={styles.option}>
        <Link className={styles.link} to="/messages">
          View Posts
        </Link>
      </div>

      <div id={styles.thirdOption} className={styles.option}>
        <Link
          className={styles.linkTwo}
          to="/"
          onClick={() => {
            handleSessionLogout()
          }}
        >
          Log Out
        </Link>
      </div>
    </>
  )
}

export default AdminDashboard
