import React from "react"
import styles from "./Loader.module.scss"

const Loader = () => {
  return (
    <div id={styles.loaderContainer}>
      <div id={styles.loader} />
      <span id={styles.text}>RETRIEVING MESSAGES...</span>
    </div>
  )
}

export default Loader
