import React from "react"
import { Link, navigate } from "gatsby"
import styles from "./AdminDashboard.module.scss"

const AdminDashboard = ({ handleSessionLogout, status }) => {
  return (
    <>
      <h2 id={styles.status}>
        <span id={styles.statusSpan}>Status: </span>
        {status}
      </h2>
      <div
        id={styles.firstOption}
        className={styles.option}
        onClick={() => navigate("/messages")}
      >
        View Posts
      </div>

      <div
        id={styles.thirdOption}
        className={styles.option}
        onClick={() => {
          handleSessionLogout()
        }}
      >
        Log Out
      </div>
    </>
  )
}

export default AdminDashboard
