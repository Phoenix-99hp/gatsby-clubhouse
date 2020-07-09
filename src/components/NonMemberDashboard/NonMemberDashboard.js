import React from "react"
import { Link } from "gatsby"
import styles from "./NonMemberDashboard.module.scss"

const NonMemberDashboard = ({ handleSessionLogout, status }) => {
  return (
    <>
      <h2 id={styles.status}>
        <span id={styles.statusSpan}>Status: </span>
        {status}
      </h2>
      <div id={styles.firstOption} className={styles.option}>
        <Link to="/messages" className={styles.link}>
          View Posts
        </Link>
      </div>

      <div id={styles.secondOption} className={styles.option}>
        <Link to="/upgrade" className={styles.link}>
          Upgrade to Member or Admin
        </Link>
      </div>

      <div id={styles.thirdOption} className={styles.option}>
        <Link
          to="/"
          className={styles.linkTwo}
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

export default NonMemberDashboard
