import React from "react"
import { navigate } from "gatsby"
import styles from "./MemberDashboard.module.scss"

const MemberDashboard = ({ handleSessionLogout, status }) => {
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
        id={styles.secondOption}
        className={styles.option}
        onClick={() => navigate("/upgrade")}
      >
        Upgrade
      </div>

      <div
        id={styles.thirdOption}
        className={styles.option}
        onClick={() => handleSessionLogout()}
      >
        Log Out
      </div>
    </>
  )
}

export default MemberDashboard
