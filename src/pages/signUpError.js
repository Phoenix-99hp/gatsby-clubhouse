import React from "react"
import SEO from "../components/SEO"
import Layout from "../components/Layout"
import styles from "../styles/error.module.scss"
import { Link } from "gatsby"

const SignUpError = () => {
  return (
    <Layout header={"main"}>
      <SEO title={"Error"} />
      <div id={styles.containerSmall}>
        <h1 id={styles.errorTitle}>Something went wrong</h1>
        <span id={styles.emoji}>😢</span>
        <p id={styles.errorP}>
          The Username, Password, and Confirm Password fields must be filled
          out.
        </p>
        <p id={styles.errorP}>
          Usernames and Passwords must be less than or equal to 30 characters.
        </p>
        <p id={styles.errorP}>
          If the above conditions are met, then the username you entered is
          probably already taken.
        </p>
        <Link className={styles.link} to="/signup">
          Try again
        </Link>
      </div>
    </Layout>
  )
}

export default SignUpError
