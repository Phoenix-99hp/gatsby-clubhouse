import React from "react"
import { Link } from "gatsby"
import styles from "./MemberDashboard.module.scss"

const MemberDashboard = ({ handleSessionLogout, status }) => {
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
          Upgrade to Admin
        </Link>
      </div>

      <div id={styles.thirdOption} className={styles.option}>
        <Link
          to="/"
          onClick={() => {
            handleSessionLogout()
          }}
          className={styles.linkTwo}
        >
          Log Out
        </Link>
      </div>
    </>
  )
}

export default MemberDashboard
