import React from "react"
import styles from "./NotFound.module.scss"

const NotFound = () => {
  return (
    <>
      <h1 id={styles.notFound}>NOT FOUND</h1>
      <span id={styles.emoji}>😢</span>
      <p id={styles.notFoundP}>
        You just hit a route that doesn&#39;t exist, or that you are not
        authorized to view... the sadness.
      </p>
    </>
  )
}

export default NotFound
